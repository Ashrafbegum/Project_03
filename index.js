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
    welcomeMessage: 'Welcome to our schedule website',
    documentTitle: "Schedule Website | Home"
  })
})

app.get('/users', (req, res) => {
  console.log(data.users)
  res.render('pages/users', {
    users: data.users,    //Pass users' details in the variable "users" to "users.ejs" page
    documentTitle: "Schedule Website | Users"
   }) 
})

app.get('/schedules', (req, res) => {
  console.log(data.schedules)
  res.render('pages/schedules', {
    schedules: data.schedules,   //Pass schedules' details in the variable "schedules" to "schedules.ejs" page
    documentTitle: "Schedule Website | Schedules"
  }) 
})

app.get('/users/new', (req, res) => {
  res.render('pages/newUser', {
    documentTitle: "Schedule Website | New user"
  })
})

app.get('/users/:id', (req, res) => {
  res.render('pages/singleUser', {
    userId: req.params.id,
    isUserIdValid: isIdValid(req.params.id),
    users: data.users,
    documentTitle: "Schedule Website | User Details"
  })
})

app.get('/users/:id/schedules', (req, res) => { 
   res.render('pages/userSchedules', {
      userId: req.params.id,
      isUserIdValid: isIdValid(req.params.id),
      schedules: data.schedules,
      documentTitle: "Schedule Website | Schedules of a user"
     })
})
  
app.get('/schedules/new', (req, res) => {
  res.render('pages/newSchedule', {
    users: data.users,
    documentTitle: "Schedule Website | New schedule"
  })
})

app.post('/users', (req, res) => {
     const pwd = req.body.password
     const hash = bcrypt.hashSync(pwd, saltRounds); //Synchronous version of bcrypt()

     req.body.password = hash   //set the password to encrypted password
     console.log(req.body.password)
     data.users.push(req.body)
    
     res.redirect('/users')
})

app.post('/schedules', (req, res) => {
    const theSchedule = {
      user_id: Number(req.body.user_id),
      day: Number(req.body.day),
      start_at: req.body.start_at + req.body.startGroup,
      end_at: req.body.end_at + req.body.endGroup
    }
    data.schedules.push(theSchedule)
    console.log(req.body)
    console.log(data.schedules)
    res.redirect('/schedules')
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