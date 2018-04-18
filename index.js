'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./app.config');

const CommentMap = require('./models/comment-map');
const CommentVideo = require('./models/comment-video');
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    let commentVideo = new CommentVideo(
		{
		date: "2018-04-06T21:03:45.395Z",
		source: "A-12345678",
		sourceName: "Lenin Vladimir",
		target: 1,
		targetName: "CABINA_OPERATIVA_1",
		commentary: "Maniobras Fuera de Doctrina",
		idExercise:2
		});

	/*let commentMap = new CommentMap(
		{ 	course: 123,
	 		speed: 18.9, 
	 		date: '2018-04-16T14:12:06.471Z', 
	 		idExercise: 1, 
	 		lat_lon: '20.343365593962275,-96.34978780102196',
	 		source: 'A-12345678', 
	 		sourceName: 'Lenin Vladimir', 
	 		target: 445, 
	 		targetName: 'ANX_1193_KING_A', 
	 		commentary: 'El vato es un imbecil'
	 	});*/
	commentVideo.save((err,commentVideoStored) =>{
		if(err)	res.status(500).json({"message": err});

	    res.status(200).json({"commentVideo": commentVideoStored});

	});
	/*commentMap.save((err,commentMapStored) =>{
		if(err)	res.status(500).json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});

	    res.status(200).json({"commentMap": commentMapStored});

	});*/
});

/* Route get all map comments by exercise id */
app.get('/api/comments-map/:exerciseId',(req,res) => {
	let query = { idExercise: req.params.exerciseId };	
	CommentMap.find(query).sort('date').exec(function(err, commentMap) {
		if(err) return res.status(500).json({message : 'Error'});
		if (!commentMap) return res.status(404).json({message : 'Error'});
		res.status(200).json({message : commentMap});
	});
});

/* Route get all video comments by exercise id */
app.get('/api/comments-video/:exerciseId',(req,res) => {
	let query = { idExercise: req.params.exerciseId };	
	CommentVideo.find(query).sort('date').exec(function(err, commentVideo) {
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
	app.listen(config.port,config.ip_address,()=>{
		console.log("App online");
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