const mongoose = require('mongoose'),
	bcrypt = require('bcryptjs'),
	config = require('../config/db');


const Post = new mongoose.Schema({
    title: { type: String, required: true },
    tags: [ {type: String} ],
    is_published: { type: Boolean, default: false },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});

