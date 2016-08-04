# noSQL: Day One

- Diff b/w relational and non relational
  - trees vs. tables
  - objects and arrays
  - what programmers use

- Mongo Shell

   - dbs are made up of collections and collections are made up of documents
   - collections are made once data is stored
   - object id's are created dynamically, unless specified
   - grouping symbol highliting
   - elipses: finish code or hit enter twice


- CRUD => save, find, update, remove
   - Create documents:
   ```js
    use video;
    db.movies.save({ "title": "Jaws", "year": 1975, "imdb": "tt0073195" })
    db.movies.save({ "title": "Mad Max 2: The Road Warrior", "year": 1981, "imdb": "tt0082694" })
    db.movies.save({ "title": "Raiders of the Lost Ark", "year": 1981, "imdb": "tt0082971" })

   ```
   - Read Documents:
   ```js
   db.movies.find({})
   db.movies.find({title: "Jaws"})
   db.movies.find({title: "Jaws", year: 1975}, {"imdb": true, "_id": false})
   db.movies.find().limit(2)
   db.movies.find().limit(2).sort({title: -1}) //desc
   db.movies.find().limit(2).sort({title: -1}).skip(1)
   ```
   - Update Documents:
   ```js
   db.movies.update({"title": "Jaws"}, {$set:{"title": 'Little Mermaid'}})
   db.movies.update({"title": "Jaws"}, {$unset:{"year": 'whatever'}})
   ```
   - Warning: `update()` without set does a wholesale update. eg:
   `db.movies.update({title:"Jaws"},{title:'Little Mermaid'})`

 - Delete Documents:
   ```js
   db.movies.remove({title: "Jaws"})
   ```
<h1 style='color:red'> WARNING: Cleans out the DB</h1>
    ```js
    db.movies.remove({})
    ```
- Query Operators: all operators start with a $ sign and need to go in there own braces
  - Greater/Less than
  ```js
  db.scores.find({score: {$gt:95}, type: 'essay'})
  db.scores.find({score: {$gt: 95, $lte:98}, type: 'essay'})
  ```
  -  Regexes, Exists?
  ```js
  db.people.find({profession:{$exists: true}})
  db.people.find({profession:{$exists: false}})
  db.people.find({name:{$regex:'a'}})
  db.people.find({name:{$regex:'^A'}})
  ```

  - Logical AND, OR: match any query inside the array
    - $or:
    ```js
    db.people.find({$or: [ name: {$regex: "e$" }, {age: {$exists: true}} ]})
    ```
      *^this is messy*

    - $and:
    - Wont' work: Last overwrites the first
      ```js
      db.scores.find({score: {$gt: 50}, score: {$lt:60}} )
      ```
    - These two work:
    ```js
      db.scores.find({score: {$gt: 50, $lt:60} })
      db.scores.find({$and: [ {score:{$gt: 50}}, {score: {$lt:60}} ] })
    ```


  - Querying inside of arrays. return a document with the number 3

    ```js
    { "a" : [ 1, 3 ] }
    { "b" : [ 3, 4 ] }
    ```
    - nope: Cannot index. can only search each index for value using the colon
    ```js
    db.nums.find({b[0]})
    ```
    - yep:
    ```js
    db.nums.find({b:3})
    ```
     *recursion also not possible*

 - $all works only on arrays
    ```js
    db.accounts.find({favorites: {$all: ['pretzels', 'beer']}})
    ```
 - $in: works on objects and arrays
      ```js
      db.accounts.find({name: {$in: ['Howard', 'Bob']}})
      ```

- **Dot Notation**
  - data:
  ```js
  parent:{
    child1: 'timmy',
    child2: 'bobby'
  }
  ```
  - nope:
  ```js
  db.fam.find({'parent': {'child2': 'bobby', child1: 'timmy'}})
  db.fam.find({'parent': {'child1': 'timmy'}})
  ```
  - yep:
  ```js
  db.fam.find({'parent.child1': 'timmy'})
  ```
  *must be in quotes*

  - **Problem**
  - You have a collection with lots of documents like this:
  ```js
  { product : "Super Duper-o-phonic",
  price : 100000000000,
  reviews : [ { user : "fred", comment : "Great!" , rating : 5 },
              { user : "tom" , comment : "I agree with Fred, somewhat!" , rating : 4 } ],
  }
  ```

      ```js
      db.catalog.find({price:{$gt: 10000}, 'reviews.rating'{$gte: 5}})
      ```

  - $push, $pop, $pull, $pushAll, $pullAll,


- More Remove
  ```js
  db.people.remove({name:{$gt:'M'}})
  ```

  ## Bonus: Aggregation Framework:
  Shape your data inside the database engine
