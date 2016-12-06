'use strict';
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const inspect = require('util').inspect
const logAllProperties = require('./logAllProperties')
const request = require('request');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');

const connection = mongoose.connection
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/sandbox')

connection.on('error', console.error.bind(console, 'connection error: '))
connection.once('open', ()=>console.log('Connected to DB!'))




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


//
//
//
//
// //Field Selection
// Story
//   .findOne({ title: /timex/i }) //regex set to case Insensitive
//   .populate('creator', 'name')
//   .then(projectedResult=>console.log(projectedResult))







// const userSchema= new Schema({
//     name: String,
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       require: true
//     },
//     admin: Boolean,
//     created_at: {
//       type: Date,
//       default: Date.now
//     },
//     updated_at: Date
// })
//
//
//
// userSchema.methods={
//   encryptPassword: function(){
//       this.password = bcrypt.hashSync(this.password, 10)
//       return this.password
//   },
//   authenticate: function(plainPass){
//     return bcrypt.compareSync(plainPass, this.password)
//   }
// }
//
// userSchema.pre('save', function(next){
//
//
//   console.log(this.password, '-----BEFORE')
//   this.encryptPassword()
//   console.log(this.password, '------ AFTER')
//
//   next()
// })
//
// const User = mongoose.model('User', userSchema)
//
// const joe = User({
//   name: 'Joe',
//   username: 'wordyallen',
//   password: 'joespass',
//   admin: false,
// })
//
//
// const victor = User({
//   name: 'Victor',
//   username: 'swolebrain',
//   password: 'victorpass',
//   admin: true,
// })
//
//
// victor.save()
//   .then(savedUser=> console.log(`User ${savedUser.name} saved!`))
//   .catch(e=>console.log(e.message))
// joe.save()
//   .then(savedUser=> console.log(`User ${savedUser.name} saved!`))
//   .catch(e=>console.log(e.message))
//
//
// User.find()
//   .then(allUsers=>console.log(allUsers))
//   .catch(e=>console.log(e.message))
//
// User.findById('57b26eedd6bf7a736e3de5e8')
//   .then(allUsers=>console.log(allUsers))
//   .catch(e=>console.log(e.message))
//
//
//
//
// User.find({
//   admin: true,
//   created_at: {
//     "$lt": new Date(2016, 7, 16)
//   }
// })
// .then(recentAdmins=> console.log(recentAdmins))
// .catch(e=>console.log(e.message))





// //syncnronous promise
// const promise = function(num) {
//   return new Promise(function(resolve) {
//     const double = num+num
//     resolve(double)
//   })
// }
//
//
// promise(2)
//   .then(results=>console.log(results))
//
// // asynchronous promise
// const unknownTime = num => new Promise(resolve=>{
//     setTimeout(()=>resolve(num), 100 )
//   }
// )
//
//
// unknownTime(2)
//   .then(received=>console.log(received))
//
//
//
// // real world promise
// const getResultsFromServer = resource => new Promise( (resolve, reject)=>{
//   const url = `http://jsonplaceholder.typicode.com/${resource}`
//   request(url, (error, response, body)=>{
//       if(!error && response.statusCode===200){
//         resolve(JSON.parse(body))
//       }else{
//         reject(console.log('no dice'))
//       }
//   })
//
// })
//
//
// getResultsFromServer('users')
//   .then(users=>{
//       const clementine = users.filter(u=>u.name==='Clementine Bauch')
//       console.log(clementine)
//   })






















// //Inheritance
// var shoe = {size: 6, gender: 'f', style: 'slipper'}
//
// //Object.create
// let magicShoe= Object.create(shoe)
//
//
// console.log('------BEFORE---------')
// logAllProperties( magicShoe)
//
//
// magicShoe.jewels= 'rubies'
//
// console.log('------AFTER---------')
// logAllProperties(magicShoe)
//
//
//
//
//
// console.log(shoe.isPrototypeOf(magicShoe), magicShoe.isPrototypeOf(shoe))
//
//
//
// // making a constructor
// function Shoe(size, color, gender, style){
//   this.size=size
//   this.color=color
//   this.gender=gender
//   this.style=style
// }
//
// Shoe.prototype ={
//     putOn: function(){ console.log('shoes on!')},
//     takeOff: function(){console.log(`Your ${this.style} stinks!`)}
// }
//
// const workShoe = new Shoe(10, 'brown', 'women', 'boot')
// workShoe.laceColor='dark brown'
//
// workShoe.takeOff()
// logAllProperties(workShoe)
//



//
//
// //basic callback
//
// function greetMe(cb){
//   cb('hi')
// }
// //
// greetMe(function(arg){
//   console.log(arg)
// })
//
//
// // //basic  promise
// //
// // const promise = num =>new Promise(resolve=>{
// //   const double = num*2
// //   resolve(double)
// // })
// //
// //
// // promise(2)
// //   .then(unknownData => console.log(unknownData))
// //
// //async
// const action = num => new Promise(resolve=>{
//   setTimeout(()=>resolve(num), 2000)
//
// });
//
// action(1)
//   .then(num=>console.log(num))
//   .catch(e=>console.log(e))
//
//
//
// //real world promise
// const getResultsFromServer = resource => new Promise((resolve, reject)=>{
//
//   const url = `http://jsonplaceholder.typicode.com/${resource}`
//
//   request(url, (error, response, body)=> {
//       if (response.statusCode >= 200 && response.statusCode < 400) {
//         resolve(body)
//       } else {
//         reject(new Error("Error fetching posts"))
//       }
//   })
//
// });
//
// getResultsFromServer('users')
//   .then(string=>JSON.parse(string))
//   .then(users=>users.filter(u=> u.name==='Clementine Bauch') )
//   .then(res=>console.log(res))
//   .catch(e=>console.log(e))















// const userSchema = new Schema({
//   name: String,
//   username:{type: String, require:true, unique:true},
//   password: {type:String, require: true},
//   admin: Boolean,
//   created_at: { type: Date, default: Date.now },
//   updated_at: Date,
// })
//
//
// userSchema.methods.encryptPassword = function(){
//       this.password = bcrypt.hashSync(this.password, 10)
//       return this.password
// }


// userSchema.methods ={
//   encryptPassword: function(){
//     this.password = bcrypt.hashSync(this.password, 10)
//     return this.password
//   },
//   authenticate: function(plainPW){
//      return bcrypt.compareSync(plainPW, this.password)
//  },
// }


// userSchema.pre('save', function(next){
//   const currentDate = new Date()
//
//   if(!this.created_at){
//     this.created_at = currentDate
//   }
//
//   this.updated_at = currentDate
//
//
//   // console.log('Unhashed------\n',joe)
//   //
//   this.password = this.encryptPassword(this.password)
//   //
//   // console.log('Hashed------\n',joe)
//   // console.log(joe.authenticate('joespass'))
//
//
//   next()
// })
//
//
//
// const User = mongoose.model('User', userSchema)
//
//
//
// const victor = User({
//   name: 'Victor Moreno',
//   username: 'swolebrain',
//   password: 'victorpass',
//   admin: true,
// })
//
//
// const joe = User({
//   name: 'Joe Narvaez',
//   username: 'wordyallen',
//   password: 'joespass',
//   admin: false,
//   isSecure: null,
// })





// joe.save()
//   .then(savedDoc=>console.log(`User ${savedDoc.name} saved!`))
//   .catch(e=>console.log(e.message))
// victor.save()
//   .then(savedDoc=>console.log(`User ${savedDoc.name} saved!`))
//   .catch(e=>console.log(e.message))

// //Reading from DB
// User.find()
//   .then(allUsers=>console.log(allUsers))


// User.find({username:'swolebrain'})
//   .then(userFromDB=>console.log(userFromDB))

// User.findById('57b22283b02f19a566d49d1f')
//   .then(user=>console.log(user))




// fnd a user that is admin that was created less than a minute ago

// let minAgo =  new Date()
// minAgo.setMinutes(minAgo.getMinutes()-1 )

// // User.find({ admin: true}).where('created_at').gt(minAgo)
// User.find({ admin:true, created_at: {$lt: minAgo }})
//   .then(results=>console.log(results))

  // User.findByIdAndUpdate(null, { admin: false },{upsert: true, new: true})
  //   .then(updatedUser=>console.log(updatedUser))


  // let minAgo = new Date()
  // minAgo.setMinutes(minAgo.getMinutes() -  9999);

  //// find all admins: show differences in query syntax
  // User.find({ admin: true}).where('created_at').gt(minAgo)
  // User.find({ admin: true , created_at:{$gt: minAgo}})
  // .then(res=>console.log(res))
  // .catch(e=>console.log(e.message))


  // User.findOneAndUpdate('57b2238f8b279be9665b17b9',{ username: 'joenarvaez' },{new: true})
  //   .then((res1)=>console.log(res1))
  //   .catch(e=>console.log(e.message, 'no dice'))










// User.findByIdAndRemove('57b2238f8b279be9665b17b9')
//   .then(deleted=>res.json(deleted))
//   .catch(e=>console.log(e.message))






// const userSchema = new Schema({
//   _id: Number,
//   name: String,
// })
//
//
// const commentSchema = new Schema({
//   body:String,
//   postId: Number
// })
//
// const postSchema = Schema({
//   _id:Number,
//   title: String,
//   comments: Array,
//   userId: {type: Number, ref: 'User'},
// })
//
// const Post = mongoose.model('Post', postSchema)
// const User = mongoose.model('User', userSchema)
// const Comment = mongoose.model('Comment', commentSchema)
//
//
//
//
//
//
//
// const joe = new User({ _id: 0, name: 'Joe'})
// const bob = new User({ _id: 0, name: 'Bob'})
// joe.save()
//
// const joePost = new Post({
//   _id:0,
//   title: "Joe's Message" ,
//   userId: 0
// })
//
// const bobPost = new Post({
//   _id:1,
//   title: "Bob's message",
//   userId: 1
// })
// const posts = [joePost, bobPost]
//
// const comment1 = new Comment({body: 'u mad bro?', postId: 0 })
// const comment2 = new Comment({ body: 'rap 4evs', postId: 0 })
// const comment3 = new Comment({ body: 'sad', postId: 1 })
// const comments = [comment1, comment2, comment3]
//
//
//
//
// for (let i = 0; i < posts.length; i++) {
//   for (let j = 0; j < comments.length; j++) {
//     if(posts[i]._id===comments[j].postId){
//
//       posts[i].comments.push(comments[j])
//     }
//   }
//   posts[i].save()
// }


// const addComments = (post, comments)=>{
//   comments.map(c=>{
//     if(post._id===c.postId){
//       post.comments.push(c)
//     }
//   })
//
// }

// addComments(bobPost, comments)
// addComments(joePost, comments)



// Post
//   .findOne({title: "Joe's Message"})
//   .populate('userId')
//   .then(res=>console.log(inspect(res, false, null)))





// Person
//   .findOne({name: 'Joe'})
//   .populate({
//     path:'stories',
//     populate: {path: 'fans'}
//   })
//   .then(res=>console.log(inspect(res, false, null)))

// Story
//   .findOne({title: 'I love Rap'})
//   .populate({
//     path: 'creator fans',
//     match: {age: {$gt:50}},
//     select: 'name -_id',
//     options: {limit: 1}
//   })
//   .then(res=>console.log(res))


// const app = express()

// const BookSchema = new Schema({
//   title: String,
//   author: String,
//   category: String
// })
//
//
// const Book = mongoose.model('Book', BookSchema)
//
//
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(cors())
//
// //DO: insert three books
// app.get('/books', (req, res)=>{
//   Book.find()
//     .then(books=>res.json(books))
//     .catch(e=>console.log(e.message))
// })
//
//
// app.get('/books/:_id', (req, res)=>{
//   Book.findById(req.params._id)
//     .then(book=>res.json(book))
//     .catch(e=>console.log(e.message))
// })
//
//
// app.post('/books',(req, res)=>{
//   const {title, author, category} = req.body
//   const newBook = new Book({title, author, category})
//   newBook.save()
//   .then(book=>res.json(book))
//   .catch(e=>console.log(e.message))
// })
//
// app.put('/books/:_id',(req,res)=>{
//   Book.findById(req.params._id)
//     .then(bookFromDB=>Object.assign(bookFromDB, req.body))
//     .then(mergedBook => mergedBook.save()
//           .then(updatedBook=>res.json(updatedBook))
//           .catch(e=>console.log(e.message))
//     ).catch(e=>console.log(e.message))
// })
//
//
// app.delete('/books/:_id', (req,res)=>{
//   Book.findByIdAndRemove(req.params._id)
//     .then(deleted=>res.json(deleted))
//     .catch(e=>console.log(e.message))
// })
//
//
//
//
// app.listen(8080, ()=>console.log('listening on 8080'))
