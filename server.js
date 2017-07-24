const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const mongoose = require('mongoose');
const chalk = require('chalk');

const config = require('./api/config/db');
const userRoute = require('./api/routes/userRoute');
const passportSetup =  require('./api/config/passport');

/*
mongod --dbpath /media/asx/DDD/Z/EX/Angular/MS/db
'C:/Program Files/MongoDB/Server/3.4/bin/mongod' --dbpath D:Z\EX\Angular\MS\db
BASH
'C:/Program Files/MongoDB/Server/3.4/bin/mongod' --dbpath D:/Z/EX/Angular/MS/db
sumit/pass
*/

// connect to DB
mongoose.connect(config.database);
mongoose.connection.on('connected', () =>{
  console.log( chalk.bgGreen(`connected to DB ${config.database}`))
})
// on error
mongoose.connection.on('error', (error) =>{
  console.log( chalk.bgRed( `error when connected to DB ${error}`) )
})


// when application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
passportSetup(passport);

app.use('/user', userRoute);

app.use(express.static(path.join(__dirname, './')));



app.listen(8080, ()=>{
    console.log( chalk.bgGreen ( `Express server is running on port 8080` ));
});