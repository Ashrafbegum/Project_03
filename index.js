//express setup
const express = require('express')
const app = express()

//set PGPASSWORD=sunwitpetchoo&& psql -U postgres -h localhost -d mrcoffee -f sql/create_schedules.sql

// Server listening at this port
const port = process.env.PORT || 3000

//postgres setup
const db = require('./database')

//access to data.js file
const data = require('./data.js')

//bcrypt setup for encrypting password
const bcrypt = require('bcrypt')
const saltRounds = 10

// Set public folder as the current working directory
app.use(express.static('public'))

// Used for post requests to parse the body
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//Set view engine
app.set('view engine',  'ejs')

//Show the homepage
app.get('/', (req, res) => {
  res.render('pages/index', {
    documentTitle: 'Homepage'
  })
})

app.get('/users', (req, res) => {
  db.any('SELECT * FROM users;')
  .then((result) => {
      res.render('pages/users', {
          documentTitle: 'Users',
          users: result
      })
  })
  .catch((err) => {
      res.send(err.message)  
  })
})

// Displays the page to add a new user
app.get('/users/new', (req, res) => {        
  res.render('pages/newUser', {
    documentTitle: 'New User',
  })
})
app.post('/users/new', (req, res) => {
  const pwd = req.body.password
  const hash = bcrypt.hashSync(pwd, saltRounds); //Synchronous version of bcrypt()

  req.body.password = hash   //set the password to encrypted password

  db.none('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4);', 
     [req.body.firstname, req.body.lastname, req.body.email, req.body.password])
  .then(() => {
      //  res.redirect('back') //Goes to the previous page
   res.redirect('/users')
   })
  .catch((err) => {
         res.send(err.message)  
 })  
})

//Display all existing schedules
app.get('/schedules', (req, res) => {
  db.any('SELECT * FROM schedules;')
  .then((result) => {
   // console.log(result)
    res.render('pages/schedules', {
      documentTitle: 'Schedules',
      schedules: result
    })
  })
  .catch((err) => {
    res.send(err.message)
  })
})

// Display a form to add a new schedule
app.get('/schedules/new', (req, res) => {     
  db.any('SELECT user_id, firstname, lastname FROM users ORDER BY firstname;')
  .then((result) => {   
      res.render('pages/newSchedule', {
        documentTitle: 'New Schedule',
        users: result
      })
  })
  .catch((err) => {
    res.send(err.message)
  })
})

//Save schedule to the database
app.post('/schedules/new', (req, res) => {
  req.body.user_id = Number(req.body.user_id)
  req.body.day = Number(req.body.day)
  db.none('INSERT INTO schedules (user_id, day, start_time, end_time) VALUES ($1, $2, $3, $4);', 
      [req.body.user_id, req.body.day, req.body.start_time, req.body.end_time])
  .then(() => {
    //  res.redirect('back') //Goes to the previous page
    res.redirect('/schedules')
  })
  .catch((err) => {
      res.send(err.message)  
  })    
})

//this view displays all the existing schedules
app.get('/view-schedules', (req,res) => {
 const space =' '
   db.any('SELECT UPPER(CONCAT(firstname, $1, lastname)) AS name, day, start_time, end_time FROM schedules_view;',[
     space
   ])

  .then((result) => {
    console.log(result)
    res.render('pages/view_schedules', {
      documentTitle: 'View For Schedules',
      schedules: result
    })
  })
  .catch((err) => {
    res.send(err.message)
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})