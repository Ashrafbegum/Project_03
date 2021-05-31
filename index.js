const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const data = require('./data.js')
const bcrypt = require('bcrypt')
const e = require('express')
const saltRounds = 10

app.use(express.json())
app.use(express.urlencoded({extended : true}))

//Returns welcome message
app.get('/', (req, res) => {  
  res.send('Welcome to our schedule website')
  console.log(data) // Prints entire data
})

//Returns the list of users
app.get('/users', (req, res) => {
  console.log(data.users)
  res.send(data.users)
})

//Returns the list of schedules
app.get('/schedules', (req, res) => {
  console.log(data.schedules)
  res.send(data.schedules )
})

//Returns the information of the given user id 
app.get('/users/:id', (req, res) => {
  if(isUserIdValid(req.params.id)) {
       if(req.params.id > data.users.length)
             res.send('User id: ' + req.params.id + ' does not exist')
       res.send(data.users[req.params.id])
  } 
  else 
       res.send("Please enter a number for the user id.")
})

//Returns a list of all schedules for the given user id
app.get('/users/:id/schedules', (req, res) => { 
    var id = Number(req.params.id)  
    if(isUserIdValid(req.params.id)) {
      var output = []
      var j=0
  
      for(var i=0; i< data.schedules.length; i++) {
        if(data.schedules[i].user_id == id ) {
          output.push(
            data.schedules[i])
          j++
        }
      }     

      if(output.length > 0) 
         res.send(output)
      else
         res.send('Schedules not found for the user id: ' + req.params.id)   
       
    }
      else 
        res.send("Please enter a number for the user id.")
})

//Adds a new user      
app.post('/users', (req, res) => {
     const pwd = req.body.password
     bcrypt.hash(pwd, saltRounds, (err,hash) => {
       req.body.password = hash   //set the password to encrypted password
       data.users.push(req.body)
     })
     res.send(req.body)
})

//Adds a new schedule
app.post('/schedules', (req, res) => {
  data.schedules.push(req.body)
  res.send(req.body)
})

app.get('/users/:id/schedules/:schId', (req, res) => {
  res.send(req.params) //It returns output in key:value format eg., id:0, schId:0
})

function isUserIdValid(userId) {
  var id = Number(userId) 
  
  // NaN() returns true if input is not a number - typeof() returns the string number
  if (typeof id === 'number' && !isNaN(id)) 
      return true;
  return false
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})