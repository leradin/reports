'use strict'

const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const CommentVideo = Schema({
	date : Date,
	source:String,
	sourceName: String,
	target:Number,
	targetName: String,
	commentary:String,
	idExercise:Number
},{ collection: 'comments-video' });


module.exports = mongoose.model('CommentVideo',CommentVideo);