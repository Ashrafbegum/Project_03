const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const data = require('./data.js')
const bcrypt = require('bcrypt')
const saltRounds = 10

app.use(express.static('public'))

// Used for post requests to parse the body
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//Set view engine
app.set('view engine',  'ejs')

app.get('/', (req, res) => {
  res.render('pages/index', {   //specifying .ejs extension is optional, it understand automatically
    welcomeMessage: 'Welcome to our schedule website'
  })
})

app.get('/users', (req, res) => {
  console.log(data.users)
  res.render('pages/users', {users: data.users}) //Pass users' details in the variable "users" to "users.ejs" page
})

app.get('/schedules', (req, res) => {
  console.log(data.schedules)
  res.render('pages/schedules', {schedules: data.schedules}) //Pass schedules' details in the variable "schedules" to "schedules.ejs" page
})

app.get('/users/:id', (req, res) => {
  res.render('pages/singleUser', {
    userId: req.params.id,
    isUserIdValid: isIdValid(req.params.id),
    users: data.users })
})

app.get('/users/:id/schedules', (req, res) => { 
   res.render('pages/userSchedules', {
      userId: req.params.id,
      isUserIdValid: isIdValid(req.params.id),
      schedules: data.schedules })
})
    
app.post('/users', (req, res) => {
     const pwd = req.body.password
     bcrypt.hash(pwd, saltRounds, (err,hash) => {
       req.body.password = hash   //set the password to encrypted password
       data.users.push(req.body)
     })
     res.send(req.body)
})

app.post('/schedules', (req, res) => {
  
  // data.schedules.push(req.body)
  // console.log(data.schedules)
  // res.send(req.body)
})

app.get('/users/:id/schedules/:schId', (req, res) => {
  res.send(req.params) //It returns output in key:value format eg., id:0, schId:0
})

function isIdValid(userId) {
  var id = Number(userId) 
  
  // NaN() returns true if input is not a number - typeof() returns the string number
  if (typeof id === 'number' && !isNaN(id)) 
      return true;
  return false
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})