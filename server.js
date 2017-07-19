const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./api/config/db');
const userRoute = require('./api/routes/userRoute');

/*
mongod --dbpath /media/asx/DDD/Z/EX/Angular/MS/db
sumit/pass

*/
// connect to DB
mongoose.connect(config.database);
// on connection
mongoose.connection.on('connected', () =>{
  console.log(`connected to DB ${config.database}`)
})

// on error
mongoose.connection.on('error', (error) =>{
  console.log(`error when connected to DB ${error}`)
})


app.use(bodyParser.json());

app.use('/user', userRoute);

app.use(express.static(path.join(__dirname, './')));





app.listen(8080, ()=>{
    console.log( `Express server is running on port 8080` );
});