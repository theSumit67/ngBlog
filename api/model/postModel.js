'use strict';
const mongoose = require('mongoose'),
	bcrypt = require('bcryptjs'),
	config = require('../config/db');


const PostSchema = new mongoose.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    tags: [ {type: String} ],
    is_published: { type: Boolean, default: false },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

const Post = module.exports = mongoose.model( 'Post', PostSchema );

module.exports.addPost = (newPost, callback) =>{
    newPost.save( callback )
}

module.exports.getPostBySlug = ( slug, callback) => {
	
	const query = { slug: slug }
	Post.findOne(query, callback);

}

module.exports.getPostByUsername =  ( username, callback) => {
	
	const query = { username: username }
	Post.find(query, callback);

}

module.exports.deletePost =  ( id, callback ) => {
	
	const query = { "_id": id }
	Post.remove( query, callback);

}
