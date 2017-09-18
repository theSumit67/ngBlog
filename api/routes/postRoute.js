'use strict';
const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    url = require('url'),
    jwt = require('jsonwebtoken');

const config = require('../config/db'),
    Post = require('../model/postModel');


router.post('/addPost', passport.authenticate('jwt', { session: false }), ( req, res, next ) => {

    // console.log( url.resolve( req.user.username + '/', req.body.slug) )
    
    var newPost = new Post({
        username: req.user.username, // 
        title: req.body.title,
        slug: req.body.slug,
        tags: req.body.tags,
        content: req.body.content,
    });
    
    newPost.slug = url.resolve( req.user.username + '/', req.body.slug);

    Post.getPostBySlug(newPost.slug, (err, post) => {
        if (err) throw err;
        if (post) {
            return res.json({ success: false, msg: "URL Already Exist" })
        } else {
            Post.addPost(newPost, ( err, post ) => {
                if (err){
                    console.log( err );
                    res.json({success: false, msg: " - Failed - "})
                }
                else{
                    res.json({ success: true, msg: "Post Added" });
                }
            })
        }
    });


})

router.get('/listPost', passport.authenticate('jwt', { session: false }), ( req, res, next ) => {

    Post.getPostByUsername( req.user.username, ( err, posts ) => {
        if ( err ) throw err;

        if( posts ){
           res.send( posts );
        } else{
           console.log( 'No Post ') 
        }

    })

})


router.get('/delete-post/:id', passport.authenticate('jwt', { session: false }), ( req, res, next ) => {

    if ( req.params.id ){
        Post.deletePost ( req.params.id, (err) =>{
            if ( err ) throw err;
            res.send ( "Post Deleted" );
        })
    }
});


module.exports = router;