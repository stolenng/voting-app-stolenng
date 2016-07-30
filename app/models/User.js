'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name: String, 
    password: String, 
    email : String 
},
{
       versionKey: false
});

module.exports = mongoose.model('User', User);

