const mongoose = require('mongoose'),
	bcrypt = require('bcryptjs'),
	config = require('../config/db');


// User Schema

const userSchema = mongoose.Schema({
	name: 	  { type: String },
	email: 	  { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true }
})

const User = module.exports = mongoose.model( 'User', userSchema );


// For passport-jwt
module.exports.getUserById = (id, callback) => {
	User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
	
	const query = { username: username }
	User.findOne(query, callback);

}
// 1 bcrypt.genSalt ( 10, callback( err, salt ) )
// 2 bcrypt.hash(user.pass, salt, callback( err, hash )  )
// 3 replace user.pass with hash & store in DB, res.json Succeeded
module.exports.addUser = (newUser, callback) => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) { throw err }
			console.log("hash  " + hash);
			newUser.password = hash;
			newUser.save(callback);
		})
	})
}

// 1 bcrypt.compare( enteredPass, hashedPass, callback( err, isMatch ) )
// 2 Matched then -> const token = jwt.sign(user, config.secret, {expiresIn: 604800});
// 3 res.json({ token: "JWT " + token,user: { userDetailsNeededOnClient } })
module.exports.comparePassword = ( candidatePassword, hash, callback ) => {
	bcrypt.compare( candidatePassword, hash, ( err, isMatch ) => {
		if (err) throw err ;
		callback( null, isMatch );
	} )
}