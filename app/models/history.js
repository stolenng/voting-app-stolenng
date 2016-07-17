'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var history = new Schema({
	query: String,
    date : {
        type : Date ,
        default: Date.now 
    }
},
{
       versionKey: false
});

module.exports = mongoose.model('history', history);
