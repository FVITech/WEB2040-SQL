# Create
- `insertOne`: explain ids
- `insertMany`: must be array and have ordered be false on error

# Read:
  -implicitly `ANDED` together , thenshow count, skip, limit, sort
  - dot notation: with quotes:
    ```js
    db.movieDetails.find({'tomato.meter':100})\
    ```
  ## Equality MAtches on Arrays:

    - The Entire Array:
    ```js
    db.movieDetails.find({writers: ['Ethan Coen', 'Joel Coen']}).count()
    ```
    *The order of elements matters*

    - Any Element in an array:
    ```js
    db.movieDetails.find({actors:'Jeff Bridges'}).pretty()
    ```
    *dont need square brackets*

    - Element with specific postion:
    ```js
    db.movieDetails.find({'actors.0':'Jeff Bridges'}).pretty()
    ```

    - Projections:
    ```js
    db.movieDetails.find({'actors.0':'Jeff Bridges'},{_id:0, title:1}).pretty()
    ```
  ## Comparison Operators

  ```js
  db.movieDetails.find({ "tomato.meter": { $gte: 95 }, runtime: { $gt: 180 } })
  ```



  - Data Cleaning
  ```js
  db.moviesScratch.find({ _id: { $type: "string" } })
  ```

## Logical Operators
```js
db.movieDetails.find({ $or : [ { "tomato.meter": { $gt: 99 } },
                               { "metacritic": { $gt: 95 } } ] })


db.movieDetails.find({ $and : [ { "metacritic": { $ne: 100 } },
                                { "metacritic" { $exists: true } } ] })
```
*`$and` is when you have to query the SAME field*


## Regex

```js
db.movieDetails.find({ "awards.text": { $regex: /^Won\s.*/ } },
                     { title: 1, "awards": 1, _id: 0})
```


## Array Operators
- `$in`
```js
db.movieDetails.find({ rated: { $in: ["G", "PG"] } })
```

- `$all`
```js
db.movieDetails.find({ genres: { $all: ["Comedy", "Crime", "Drama"] } })
```
*doest have to be in order*

- `$size`
```js
db.movieDetails.find({ countries: { $size: 1 } }).pretty()
```

# Update

- updateOne:
```js
db.movieDetails.updateOne({title: "The Martian"},
                          { $set: { "awards" : {"wins" : 8,
		                              "nominations" : 14,
		                                "text" : "Nominated for 3 Golden Globes. Another 8 wins & 14 nominations." } } });
```
*updates first one it finds but irrelelvant since in apps you use ids*


- `$inc`: as users take actions
```js
db.movieDetails.updateOne({title: "The Martian"},
                          { $inc: { "tomato.reviews": 3, "tomato.userReviews": 25 } })
```


- `$push/$each`
```js
db.movieDetails.updateOne({title: "The Martian"},
                          {$push: { reviews: { rating: 4.5,
                                               date: ISODate("2016-01-12T09:00:00Z"),
                                               reviewer: "Spencer H.",
                                               text: "The Martian could have been a sad drama film, instead it was a hilarious film with a little bit of drama added to it. The Martian is what everybody wants from a space adventure. Ridley Scott can still make great movies and this is one of his best."} } })



                                               db.movieDetails.updateOne({title: "The Martian"},
                                                                         {$push: { reviews:
                                                                                   { $each: [
                                                                                       { rating: 0.5,
                                                                                         date: ISODate("2016-01-12T07:00:00Z"),
                                                                                         reviewer: "Yabo A.",
                                                                                         text: "i believe its ranked high due to its slogan 'Bring him Home' there is nothing in the movie, nothing at all ! Story telling for fiction story !"},
                                                                                       { rating: 5,
                                                                                         date: ISODate("2016-01-12T09:00:00Z"),
                                                                                         reviewer: "Kristina Z.",
                                                                                         text: "This is a masterpiece. The ending is quite different from the book - the movie provides a resolution whilst a book doesn't."},
                                                                                       { rating: 2.5,
                                                                                         date: ISODate("2015-10-26T04:00:00Z"),
                                                                                         reviewer: "Matthew Samuel",
                                                                                         text: "There have been better movies made about space, and there are elements of the film that are borderline amateur, such as weak dialogue, an uneven tone, and film cliches."},
                                                                                       { rating: 4.5,
                                                                                         date: ISODate("2015-12-13T03:00:00Z"),
                                                                                         reviewer: "Eugene B",
                                                                                         text: "This novel-adaptation is humorous, intelligent and captivating in all its visual-grandeur. The Martian highlights an impeccable Matt Damon, power-stacked ensemble and Ridley Scott's masterful direction, which is back in full form."},
                                                                                       { rating: 4.5,
                                                                                         date: ISODate("2015-10-22T00:00:00Z"),
                                                                                         reviewer: "Jens S",
                                                                                         text: "A declaration of love for the potato, science and the indestructible will to survive. While it clearly is the Matt Damon show (and he is excellent), the supporting cast may be among the strongest seen on film in the last 10 years. An engaging, exciting, funny and beautifully filmed adventure thriller no one should miss."},

                                                                                       { rating: 4.5,
                                                                                         date: ISODate("2016-01-12T09:00:00Z"),
                                                                                         reviewer: "Spencer H.",
                                                                                         text: "The Martian could have been a sad drama film, instead it was a hilarious film with a little bit of drama added to it. The Martian is what everybody wants from a space adventure. Ridley Scott can still make great movies and this is one of his best."} ] } } } )


```
*must use $each to make array flat*


- push most recent and slice off the oldest
```js
db.movieDetails.updateOne({ title: "The Martian" },
                          {$push: { reviews:
                                    { $each: [
                                        { rating: 0.5,
                                          date: ISODate("2016-01-13T07:00:00Z"),
                                          reviewer: "Shannon B.",
                                          text: "Enjoyed watching with my kids!" } ],
                                      $position: 0,
                                      $slice: 5 } } } )
```
*dont forget to set the position*



- data cleaning with `$unset`
```js
db.movieDetails.find({rated:null}).count()
db.movieDetails.updateMany( { rated: null },{ $unset: { rated: "" } } )
```


- Upserts: Update, if none, create it

```js
db.movieDetails.update({title:'The Martian 2'},{$set:{unreleased: true}})
db.movieDetails.find({title:'The Martian 2'})
db.movieDetails.update({title:'The Martian 2'},{$set:{unreleased: true}},{upsert:true})
```

- Replace

```js
var detail = {
    "title" : "The Martian",
    "year" : 2015,
    "rated" : "PG-13",
    "released" : ISODate("2015-10-02T04:00:00Z"),
    "runtime" : 144,
    "countries" : [
	"USA",
	"UK"
    ],
    "genres" : [
	"Adventure",
	"Drama",
	"Sci-Fi"
    ],
    "director" : "Ridley Scott",
    "writers" : [
	"Drew Goddard",
	"Andy Weir"
    ],
    "actors" : [
	"Matt Damon",
	"Jessica Chastain",
	"Kristen Wiig",
	"Jeff Daniels"
    ],
    "plot" : "During a manned mission to Mars, Astronaut Mark Watney is presumed dead after a fierce storm and left behind by his crew. But Watney has survived and finds himself stranded and alone on the hostile planet. With only meager supplies, he must draw upon his ingenuity, wit and spirit to subsist and find a way to signal to Earth that he is alive.",
    "poster" : "http://ia.media-imdb.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX300.jpg",
    "imdb" : {
	"id" : "tt3659388",
	"rating" : 8.2,
	"votes" : 187881
    },
    "tomato" : {
	"meter" : 93,
	"image" : "certified",
	"rating" : 7.9,
	"reviews" : 280,
	"fresh" : 261,
	"consensus" : "Smart, thrilling, and surprisingly funny, The Martian offers a faithful adaptation of the bestselling book that brings out the best in leading man Matt Damon and director Ridley Scott.",
	"userMeter" : 92,
	"userRating" : 4.3,
	"userReviews" : 104999
    },
    "metacritic" : 80,
    "awards" : {
	"wins" : 8,
	"nominations" : 14,
	"text" : "Nominated for 3 Golden Globes. Another 8 wins & 14 nominations."
    },
    "type" : "movie"
};

```

```js
db.movies.replaceOne(
    {"imdb": detail.imdb.id},
    detail);
```
