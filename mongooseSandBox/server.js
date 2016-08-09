// import request from 'requessasat'
// import logAllProperties from './helpers'
import mongoose,{connection, Schema} from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.get('/', (req,res)=>{
  res.send('laura is the smartest and prettiest <3_<3')
})


mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/books')
const db = connection

db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', ()=>console.log('We are in biznazz!'))

const BookSchema = new Schema({
  title: String,
  published:{
    type: Date,
    default: Date.now
  },
  keywords: Array,
  published: Boolean,
  author:{
    type: Schema.ObjectId,
    ref: 'User'
  },
  detail:{
    modelNumber: Number,
    hardcover: Boolean,
    reviews: Number,
    rank: Number
  }
})

const Book = mongoose.model('Book', BookSchema)

app.listen(8080, console.log('listening on 8080'))








// const userSchema = new Schema({
//   name: String,
//   username:{type: String, require:true, unique:true},
//   password: {type:String, require: true},
//   admin: Boolean,
//   created_at: Date,
//   updated_at: Date,
// })
//
//
// userSchema.methods.makeCool = function(){
//   this.name = this.name+`-dude`
//   return this.name
// }
//
//
// userSchema.pre('save', function(next){
//   const currentDate = new Date()
//
//   if(!this.created_at){
//     this.created_at = currentDate
//   }
//
//   this.updated_at = currentDate
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
// const laura = User({
//   name: 'Laura Heil',
//   username: 'laurita',
//   password: 'theo4ever',
//   admin: true,
// })
//
//
// const joe = User({
//   name: 'Joe Narvaez',
//   username: 'brunhilda',
//   password: 'rap4ever',
//   admin: false,
// })
//
//
//
// laura.makeCool()


// joe.save()
//   .then(docSaved=>console.log(docSaved))
//   .catch(e=>console.log(e.message))

//Reading from DB
// User.find()
//   .then(allUsers=>console.log(allUsers[0]))


// User.find({username:'laurita'})
//   .then(user=>console.log(user))




//fnd a user that is admin that was created more than a minute ago

// let minAgo =  new Date()
// minAgo.setMinutes(minAgo.getMinutes()-1 )

// User.find({ admin: true}).where('created_at').gt(minAgo)
// User.find({ admin:true, created_at: {$gt: minAgo }})
//   .then(results=>console.log(results))

  // User.findOneAndUpdate({ name: 'Laura' }, { admin: true },{upsert: true})
  //   .then(res1=>console.log(res1))


  // let minAgo = new Date()
  // minAgo.setMinutes(minAgo.getMinutes() -  9999);

  //// find all admins: show differences in query syntax
  // User.find({ admin: true}).where('created_at').gt(minAgo)
  // User.find({ admin: true , created_at:{$gt: minAgo}})
  // .then(res=>console.log(res))
  // .catch(e=>console.log(e.message))


  // User.findOneAndUpdate('57a6990af19df9d83da5dd2d',{ username: 'laurita' },{new: true})
  //   .then((res1)=>console.log(res1))
  //   .catch(e=>console.log(e.message, 'no dice'))
  //






// mongoose.connect('mongodb://localhost/users')
//  mongoose.Promise = global.Promise
// const db = connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', ()=> console.log('Connected to DB'))
//
// //create a user schema
// const userSchema = new Schema({
//   name: String,
//   username: {type: String, require: true, unique: true},
//   password: {type: String, required: true},
//   admin: Boolean,
//   location: String,
//   created_at: Date,
//   updated_at: Date
// })
//
// userSchema.methods.makeCool = function() {
//   this.name = this.name + '-dude';
//   return this.name;
// }
//
// //pre/middleware:
// userSchema.pre('save', function(next) {
//   const currentDate = new Date()
//
//   if (!this.created_at){
//     this.created_at = currentDate
//   }
//   this.updated_at = currentDate;
//
//   next()
// })
//
//
//
// const User = mongoose.model('User', userSchema);
//
//
// //Create
// const joe = User({
//   name: 'Joe',
//   username: 'wordyallen',
//   password: 'pwd',
//   admin: false
// })
//
//
// joe.makeCool()
//
//
// const victor = User({
//   name: 'Victor',
//   username: 'swolebrain',
//   password: 'test',
//   admin: true
// })
//


// joe.save()
//   .then(doc=>console.log(`User ${doc.name} created!`))
//   .catch(e=>console.log(e.message))



// // Read: Find All
// User.find()
//   .then(doc=>console.log(doc))
//   .catch(e=>console.log(e.message))


// //Read: Find One
// User.find({username:'wordyallen'})
//   .then(user=>console.log(user))
//   .catch(e=>console.log(e.message))



// let minAgo = new Date()
// minAgo.setMinutes(minAgo.getMinutes() -  9999);

//// find all admins: show differences in query syntax
// User.find({ admin: true}).where('created_at').gt(minAgo)
// User.find({ admin: true , created_at:{$gt: minAgo}})
// .then(res=>console.log(res))
// .catch(e=>console.log(e.message))




//Update! if you get null it means it could not find it and returned nothing
// User.findOneAndUpdate({ username: 'wordyallan' }, { username: 'wordyallen' },{new: true})
//   .then((res1)=>console.log(res1))
//   .catch(e=>console.log(e.message, 'no dice'))
//
// //TODO: Show auto-incrementing ids
// User.findOneAndUpdate('57a6990af19df9d83da5dd2d',{ username: 'wordyallan' },{new: true})
//   .then((res1)=>console.log(res1))
//   .catch(e=>console.log(e.message, 'no dice'))


// User.findOneAndRemove({ username: 'wordyallen' })
//   .then(doc=>console.log(`User ${doc.name} deleted!`))
//   .catch(e=>console.log(e.message))








// //Protoypes
// const witch = "I'll get you, my pretty... and your little dog too!"
// const scarecrow = "Some people without brains do an awful lot of talking."
// const glinda = "Be gone! Before someone drops a house on you!"
// const dorothy = "There's no place like home."
// const lion = "Come on, get up and fight, you shivering junkyard!"
// const wizard = "Do not arouse the wrath of the great and powerful Oz!"
// const tinman = "Now I know I have a heart, because it's breaking"
//
//
// //explain normalizing data with toUpperCase
// String.prototype.countAll =  function(letterToSearchFor) {
//     let letterCount=0
//     for (var i = 0; i < this.length; i++) {
//       if(letterToSearchFor.toUpperCase()){
//         letterCount++
//       }
//
//     }
//     return letterCount
// }
//
// console.log(witch.countAll('o'))
//
//
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
//     putOn (){ console.log('shoes on!')},
//     takeOff(){console.log('stank!')}
// }
//
// const workShoe = new Shoe(10, 'brown', 'women', 'boot')
// workShoe.laceColor='dark brown'
//
// workShoe.putOn()






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
//
// //basic async promise
//
// const promise = num =>new Promise(resolve=>{
//   resolve(num)
// })
//
//
// promise(1)
//   .then(unknownData => console.log(unknownData))
//
//
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
//   // .then(users=>users.filter(u=> /C/.test(u.name) ) )
//   .then(res=>console.log(res))
//   .catch(e=>console.log(e))
