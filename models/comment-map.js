'use strict'

const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const CommentMap = Schema({
	source:Number,
	target:Number,
	comment:String,
	exerciseId:Number
},{ collection: 'comments-map' });


module.exports = mongoose.model('CommentMap',CommentMap);