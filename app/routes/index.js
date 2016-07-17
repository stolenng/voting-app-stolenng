'use strict';

var path = process.cwd();
var imageAPI = require(path + '/app/controllers/imageAPI.server.js');
var imageParser = require("../models/imageParser.js");
var history = require("../models/history.js");
var apicache = require('apicache').options({ debug: true }).middleware;
var imgAPI = new imageAPI();


//https://pixabay.com/api/docs/

module.exports = function (app) {

	app.get('/api/imagesearch/:search', apicache('24 hour'),function (req, res, next) {
		var currentItem = new history ({
			query: req.params.search
		});
		currentItem.save(function(err) {
			if(err) throw err;
		});
	},
	function (req, res) {
		var searchQuery = req.params.search;
		var offset = req.query.offset || 1;
		
		
		imgAPI.getImages(searchQuery, offset).then(function (items) {
			var parsedItems = items.map(imageParser);
			res.json(parsedItems);
		});
	});
	
	app.get('/api/latest/imagesearch/', function (req, res) {
		history.find({}, '-_id', { limit:10, sort: { date: -1 } }, function(err, data) {
		  if (err) throw err;
		  res.json(data);
		});
	});
	
	app.route('/').get(function (req, res) {
		res.sendFile(path + '/public/index.html');
	});

};
