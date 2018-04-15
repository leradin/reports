'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./database.config');

const CommentMap = require('../models/comment-map');
const CommentVideo = require('../models/comment-video');
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
/*app.get('/', (req, res) => {
    let commentMap = new CommentMap();
    commentMap.comment = "aaa";
    commentMap.source = 1;
    commentMap.target = 3;
    commentMap.exerciseId = 1;
	commentMap.save((err,commentMapStored) =>{
		if(err)	res.status(500).json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});

	    res.status(200).json({"commentMap": commentMapStored});

	});
});*/

/* Route get all map comments by exercise id */
app.get('/api/comments-map/:exerciseId',(req,res) => {
	let query = { exerciseId: req.params.exerciseId };	
	CommentMap.find(query,(err,commentMap) => {
		if(err) return res.status(500).json({message : 'Error'});
		if (!commentMap) return res.status(404).json({message : 'Error'});
		res.status(200).json({message : commentMap});
	});
});

/* Route get all video comments by exercise id */
app.get('/api/comments-video/:exerciseId',(req,res) => {
	let query = { exerciseId: req.params.exerciseId };	
	CommentVideo.find(query,(err,commentVideo) => {
		if(err) return res.status(500).json({message : 'Error'});
		if (!commentVideo) return res.status(404).json({message : 'Error'});
		res.status(200).json({message : commentVideo});
	});
});

// Create the database connection 
mongoose.connect(config.url); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () { 
	app.listen(config.port,()=>{
		console.log("API REST ...");
	}); 
	console.log('Mongoose default connection open to ' + config.url);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});