'use strict';

var path = process.cwd();
var jwt = require('jsonwebtoken');
var User = require("../models/User.js");

/*
var imageAPI = require(path + '/app/controllers/imageAPI.server.js');
var imageParser = require("../models/imageParser.js");
var apicache = require('apicache').options({ debug: true }).middleware;
var imgAPI = new imageAPI();
*/

module.exports = function(app) {

		app.use('/api/*', function(req, res, next) {
		console.log("midle");
		// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		// decode token
		if (token) {

			// verifies secret and checks exp
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {
				if (err) {
					return res.json({
						success: false,
						message: 'Failed to authenticate token.'
					});
				}
				else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;
					next();
				}
			});

		}
		else {

			// if there is no token
			// return an error
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			});

		}
	});

	app.route('/api/users').get(function(req, res) {
		User.find({}, function(err, users) {
			res.json(users);
		});
	});

	app.post('/register', function(req, res) {
		// create a sample user
		var newUser = new User({
			name: req.body.username,
			email: req.body.email,
			password: req.body.password
		});

		// save the sample user
		newUser.save(function(err) {
			if (err){ 
			  res.json({ success: false, message : "User Name Already Exists!" });
			}
			else {
				res.json({
					success: true
				});
			}
		});
	});

	app.post('/auth', function(req, res) {
		//console.log(req.body.username);
		User.findOne({
			name: req.body.username
		}, function(err, user) {

			if (err) throw err;

			if (!user) {
				res.json({
					success: false,
					message: 'Authentication failed. User not found.'
				});
			}
		   if (user) {

				// check if password matches
				if (user.password != req.body.password) {
					res.json({
						success: false,
						message: 'Authentication failed. Wrong password.'
					});
				}
				else {

					// if user is found and password is right
					// create a token
					var token = jwt.sign(user, app.get('superSecret'), {
						expiresIn: "1d" // expires in 24 hours
					});

					// return the information including token as JSON
					res.json({
						success: true,
						message: 'Enjoy your token!',
						token: token
					});
				}

			}

		});
	});


	app.route('/').get(function(req, res) {
		res.sendFile(path + '/public/index.html');
	});




};
