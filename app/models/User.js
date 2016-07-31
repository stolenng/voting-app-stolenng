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

User.pre('save', function (next) {
    var self = this;
    user.find({name : self.name}, function (err, docs) {
        if (!docs.length){
            next();
        }else{                
            console.log('user exists: ',self.name);
            next(new Error("User exists!"));
        }
    });
}) ;

var user = mongoose.model('User', User);


module.exports = user;
