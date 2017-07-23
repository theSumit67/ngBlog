const JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt 	  = require('passport-jwt').ExtractJwt,
	User 		  = require('../model/userModel'),
	config 		  = require('./db'),
	chalk 		  = require('chalk');


module.exports = (passport) => {
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader(); // fetch token
	opts.secretOrKey = config.secret;

	console.log( chalk.bgCyan(" ... passPorting ... " ));

	passport.use(new JwtStrategy( opts, ( jwt_payload, done ) => {
		
		// must check the payload result
		console.log( jwt_payload );

		User.getUserById( jwt_payload._doc._id, ( err, user) => {
			if (err) {
				return done( err, false)
			}
			if( user ){
				return done( null, user)
			}
			else{
				return done( null, false)
			}
		})

	}))
}