'use strict';

var mongoose = require('mongoose');
var pollOption = require("../models/pollOption.js");
var Schema = mongoose.Schema;

var poll = new Schema({
    userName: String, 
    title: String, 
    votes: [pollOption],
    voters: [String]
},
{
       versionKey: false
});



module.exports = mongoose.model('poll', poll);

