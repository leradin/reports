'use strict'

const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const CommentMap = Schema({
	date : Date,
	course: Number,
	speed:Number,
	lat_lon:String,
	source:String,
	sourceName: String,
	target:Number,
	targetName: String,
	commentary:String,
	idExercise:Number
},{ collection: 'comments-map' });


module.exports = mongoose.model('CommentMap',CommentMap);