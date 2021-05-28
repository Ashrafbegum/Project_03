const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const data = require('./data.js')
const bcrypt = require('bcrypt')
const saltRounds = 10

app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.get('/', (req, res) => {
  res.send('Welcome to our schedule website')
  console.log(data) // Prints entire data
})

app.get('/users', (req, res) => {
  console.log(data.users)
  res.send(data.users)
})

app.get('/schedules', (req, res) => {
  console.log(data.schedules)
  res.send(data.schedules )
})

app.get('/users/:id', (req, res) => {
  if(req.params.id> data.users.length)
  res.send('id is not valid')
  res.send(data.users[req.params.id])
})

app.get('/users/:id/schedules', (req, res) => { 
    var id = Number(req.params.id) 
  
    // NaN() returns true if input is not a number - typeof() returns the string number
    if(typeof id === 'number' && !isNaN(id)) {   
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
         res.send('Schedules not found for the id:' + req.params.id)   
       
    }
      else 
        res.send("Please enter a number for the user id.")
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
  data.schedules.push(req.body)
  console.log(data.schedules)
  res.send(req.body)
})

app.get('/users/:id/schedules/:schId', (req, res) => {
  res.send(req.params) //It returns output in key:value format eg., id:0, schId:0
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})