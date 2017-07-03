const express = require('express');
const app = express(),
	   bodyParser = require('body-parser');


app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());

app.post('/register', ( req, res, next )=>{

    //

})


app.listen(8080, ()=>{
    console.log( `Express server is running on port 8080` );
});