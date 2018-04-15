'use strict'

const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const CommentVideo = Schema({
	source:Number,
	target:Number,
	comment:String,
	exerciseId:Number
},{ collection: 'comments-video' });


module.exports = mongoose.model('CommentVideo',CommentVideo);