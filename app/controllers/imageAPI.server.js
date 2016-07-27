'use strict';

var auth = require("../config/auth.js");
var request = require("request");
var q = require('q');

//var pixabay_key = auth.pixabay.key;

function imageAPI () {
/*	
	this.getImages = function (query, offset) {
		var deffer = q.defer();
		var apiRequest = "https://pixabay.com/api/?key=" + pixabay_key + "&q=" + query + "&image_type=photo&pretty=true&page=" + offset;
		request(apiRequest, function(error, response, body) {
		  if(error) {
		  	deffer.reject("error");
		  }
		  deffer.resolve(JSON.parse(body).hits);	
		});
		return deffer.promise;
	};
	*/
}

module.exports = imageAPI;
