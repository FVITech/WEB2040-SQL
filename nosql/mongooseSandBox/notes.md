# Protoypes

```js
//Protoypes
const witch = "I'll get you, my pretty... and your little dog too!"
const scarecrow = "Some people without brains do an awful lot of talking."
const glinda = "Be gone! Before someone drops a house on you!"
const dorothy = "There's no place like home."
const lion = "Come on, get up and fight, you shivering junkyard!"
const wizard = "Do not arouse the wrath of the great and powerful Oz!"
const tinman = "Now I know I have a heart, because it's breaking"






//explain normalizing data with toUpperCase
String.prototype.countAll =  function(letterToSearchFor) {
    let letterCount=0
    for (var i = 0; i < this.length; i++) {
      if(this[i].toUpperCase()===letterToSearchFor.toUpperCase()){
        letterCount++
      }

    }
    return letterCount
}

console.log('hello'.countAll('o'))


//Inheritance
var shoe = {size: 6, gender: 'f', style: 'slipper'}

//Object.create
let magicShoe= Object.create(shoe)


console.log('------BEFORE---------')
logAllProperties( magicShoe)


magicShoe.jewels= 'rubies'

console.log('------AFTER---------')
logAllProperties(magicShoe)


console.log(shoe.isPrototypeOf(magicShoe), magicShoe.isPrototypeOf(shoe))

```

# Constructors and Inheritance
```js


//Inheritance
var shoe = {size: 6, gender: 'f', style: 'slipper'}

//Object.create
let magicShoe= Object.create(shoe)


console.log('------BEFORE---------')
logAllProperties( magicShoe)


magicShoe.jewels= 'rubies'

console.log('------AFTER---------')
logAllProperties(magicShoe)





console.log(shoe.isPrototypeOf(magicShoe), magicShoe.isPrototypeOf(shoe))



// making a constructor
function Shoe(size, color, gender, style){
  this.size=size
  this.color=color
  this.gender=gender
  this.style=style
}

Shoe.prototype ={
    putOn: function(){ console.log('shoes on!')},
    takeOff: function(){console.log(`Your ${this.style} stinks!`)}
}

const workShoe = new Shoe(10, 'brown', 'women', 'boot')
workShoe.laceColor='dark brown'

workShoe.takeOff()
logAllProperties(workShoe)
```

# ES2015 Promises
```js
//basic callback
function greetMe(cb){
  cb('hi')
}

greetMe(function(arg){
  console.log(arg)
})


//syncnronous promise
const promise = function(num) {
  return new Promise(function(resolve) {
    const double = num+num
    resolve(double)
  })
}


promise(2)
  .then(results=>console.log(results))

// asynchronous promise
const unknownTime = num => new Promise(resolve=>{
    setTimeout(()=>resolve(num), 100 )
  }
)


unknownTime(2)
  .then(received=>console.log(received))



// real world promise
const getResultsFromServer = resource => new Promise( (resolve, reject)=>{
  const url = `http://jsonplaceholder.typicode.com/${resource}`
  request(url, (error, response, body)=>{
      if(!error && response.statusCode===200){
        resolve(JSON.parse(body))
      }else{
        reject(console.log('no dice'))
      }
  })

})


getResultsFromServer('users')
  .then(users=>{
      const clementine = users.filter(u=>u.name==='Clementine Bauch')
      console.log(clementine)
  })

```


# Mongoose Schemas, hooks and custom methods
```js
const mongoose = require('mongoose')
const connection = mongoose.connection
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/sandbox')

connection.on('error', console.error.bind(console, 'connection error: '))
connection.once('open', ()=>console.log('Connected to DB!'))


const userSchema= new Schema({
    name: String,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true
    },
    admin: Boolean,
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: Date
})



userSchema.methods={
  encryptPassword: function(){
      this.password = bcrypt.hashSync(this.password, 10)
      return this.password
  },
  authenticate: function(plainPass){
    return bcrypt.compareSync(plainPass, this.password)
  }
}

userSchema.pre('save', function(next){


  console.log(this.password, '-----BEFORE')
  this.encryptPassword()
  console.log(this.password, '------ AFTER')

  next()
})

const User = mongoose.model('User', userSchema)

const joe = User({
  name: 'Joe',
  username: 'wordyallen',
  password: 'joespass',
  admin: false,
})


const victor = User({
  name: 'Victor',
  username: 'swolebrain',
  password: 'victorpass',
  admin: true,
})


joe.save()
  .then(savedUser=> console.log(`User ${savedUser.name} saved!`))
  .catch(e=>console.log(e.message))


console.log(joe.authenticate('joespass') //check if authenticated

User.find()
  .then(allUsers=>console.log(allUsers))
  .catch(e=>console.log(e.message))

User.findById('57b26eedd6bf7a736e3de5e8')
  .then(allUsers=>console.log(allUsers))
  .catch(e=>console.log(e.message))




User.find({
  admin: true,
  created_at: {
    "$lt": new Date(2016, 7, 16)
  }
})
.then(recentAdmins=> console.log(recentAdmins))
.catch(e=>console.log(e.message))
```



# Mongoose Population Docs

```js

//basic population
const personSchema = Schema({
  _id     : Number,
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});



const storySchema = Schema({
  creator : { type: Number, ref: 'Person' },
  title    : String,
  fans     : [{ type: Number, ref: 'Person' }]
});


const Story  = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);



const joe = new Person({
  _id: 0,
  name: 'Joe',
  age: 100
});

const story = new Story({
  title: "Once upon a timex.",
  creator: joe._id,    // assign the _id from the person
})


// TODO: comment once saved!
// joe.save()
// .then(savedUser=> console.log(`User ${savedUser.name} saved!`))
// .catch(e=>console.log(e.message))
//
// story
//   .save()
//   .then(savedStory=>console.log('Story Saved!'))
//   .catch(e=>console.log(e.message))


Story
  .findOne({ title: 'Once upon a timex.' })
  .populate('creator')
  .then(story => console.log(story))


// field selection
Story
  .findOne({ title: 'Once upon a timex.' })
  .populate('creator', 'name')
  .then(story => console.log(story)

// Multilple paths

//TODO: ------DROP DB----

 const joe = new Person({
  _id: 0,
  name: 'Joe',
  age: 100
});
const bob = new Person({
  _id: 1,
  name: 'Bob',
  age: 50
});

const story = new Story({
  title: "Once upon a timex.",
  creator: joe._id,    // assign the _id from the person
  fans: [joe._id, bob._id]
})


// TODO: comment once saved!
// bob.save()
// .then(savedUser=> console.log(`User ${savedUser.name} saved!`))
// .catch(e=>console.log(e.message))
// joe.save()
// .then(savedUser=> console.log(`User ${savedUser.name} saved!`))
// .catch(e=>console.log(e.message))
//
// story
//   .save()
//   .then(savedStory=>console.log('Story Saved!'))
//   .catch(e=>console.log(e.message))


Story
  .findOne({ title: 'Once upon a timex.' })
  .populate('creator fans')
  .then(story => console.log(story))









//real world data population
const userSchema = new Schema({
  _id: Number,
  name: String,
})


const commentSchema = new Schema({
  body:String,
  postId: Number
})

const postSchema = Schema({
  _id:Number,
  title: String,
  comments: Array,
  userId: {type: Number, ref: 'User'},
})

const Post = mongoose.model('Post', postSchema)
const User = mongoose.model('User', userSchema)
const Comment = mongoose.model('Comment', commentSchema)







const joe = new User({ _id: 0, name: 'Joe'})
const bob = new User({ _id: 0, name: 'Bob'})
joe.save()

const joePost = new Post({
  _id:0,
  title: "Joe's Message" ,
  userId: 0
})

const bobPost = new Post({
  _id:1,
  title: "Bob's message",
  userId: 1
})
const posts = [joePost, bobPost]

const comment1 = new Comment({body: 'u mad bro?', postId: 0 })
const comment2 = new Comment({ body: 'rap 4evs', postId: 0 })
const comment3 = new Comment({ body: 'sad', postId: 1 })
const comments = [comment1, comment2, comment3]




for (let i = 0; i < posts.length; i++) {
  for (let j = 0; j < comments.length; j++) {
    if(posts[i]._id===comments[j].postId){

      posts[i].comments.push(comments[j])
    }
  }
  posts[i].save()
}



Post
  .findOne({title: "Joe's Message"})
  .populate('userId')
  .then(res=>console.log(inspect(res, false, null)))





User
  .findOne({name: 'Joe'})
  .populate({
    path:'stories',
    populate: {path: 'fans'}
  })
  .then(res=>console.log(inspect(res, false, null)))

Post
  .findOne({title: 'I love Rap'})
  .populate({
    path: 'creator fans',
    match: {age: {$gt:50}},
    select: 'name -_id',
    options: {limit: 1}
  })
  .then(res=>console.log(res))

```
