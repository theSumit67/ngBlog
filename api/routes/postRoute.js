const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    jwt = require('jsonwebtoken');

const config = require('../config/db'),
    Post = require('../model/postModel');


router.post('/create', passport.authenticate('jwt', { session: false }), ( req, res, next ) => {



})