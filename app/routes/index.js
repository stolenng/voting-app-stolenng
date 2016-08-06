'use strict';

var path = process.cwd();
var jwt = require('jsonwebtoken');
var User = require("../models/User.js");
var poll = require("../models/poll.js");


var getClientAddress = function(req) {
	return (req.headers['x-forwarded-for'] || '').split(',')[0] ||
		req.connection.remoteAddress;
};

module.exports = function(app) {

	app.use('/api/*', function(req, res, next) {
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

	/*	app.route('/polls').get(function(req, res) {
				poll.find({}, function(err, polls) {
					res.json(polls);
				});
				poll.remove({}, function(err,removed) {

				});
			});
	*/
	app.post('/register', function(req, res) {
		// create a sample user
		var newUser = new User({
			name: req.body.username,
			email: req.body.email,
			password: req.body.password
		});

		// save the sample user
		newUser.save(function(err) {
			if (err) {
				res.json({
					success: false,
					message: "User Name Already Exists!"
				});
			}
			else {
				res.json({
					success: true
				});
			}
		});
	});

	app.post('/api/polls/create', function(req, res) {
		var newPoll = new poll({
			title: req.body.pollName,
			userName: req.body.userName,
			votes: req.body.votes
		});


		newPoll.save(function(err, poll) {
			if (err) {
				console.log(err);
				res.json({
					success: false,
					message: err
				});
			}
			else {
				res.json({
					success: true,
					message: "Successfully Created Poll!",
					data: poll
				});
			}
		});
	});


	app.get('/polls/single', function(req, res) {
		poll.findOne({
			_id: req.query.pollId
		}, function(err, poll) {
			if (err) throw err;
			res.json(poll);
		});
	})
	
	app.delete('/api/polls/delete/:id', function(req, res) {
		var pollId = req.params.id;
		poll.remove({ _id : pollId}, function (err) {
			if(err) throw err;
			
			res.json({
				success: true,
				message: "Your Poll Was Successfully Deleted !"
			});
		});
		
	});
	
	app.post('/polls/vote/add', function(req, res) {
		var postId = req.body.pollId;
		var newOption =req.body.option;

		poll.findOne({ 
			_id : postId
		}, function(err, poll) {
			if(err) throw err;
			poll.votes.push(newOption);
			poll.save(function (err) {
				if(err) throw err;
				res.json({
					success: true,
					message: "Option Was Added Successfully"
				});
			});
		});
	});

	app.post('/polls/vote', function(req, res) {
		var name = "";
		if (req.body.loggedUser) {
			name = req.body.userName;
		}
		else {
			name = getClientAddress(req);
		}
		poll.findOne({
			_id: req.body.pollId
		}, function(err, poll) {
			if (err) throw err;
			if (poll.voters.indexOf(name) != -1) {
				res.json({
					success: false,
					message: "User Already Voted !"
				});
			}
			else {
				poll.voters.push(name);
				poll.votes.find(function(value) {
					if (value.name == req.body.voteName) {
						value.count++;
					}
				});
				poll.save(function(err) {
					if (err) throw err;

					res.json({
						success: true,
						message: "Your Vote Was Successfully Added !"
					});
				});

			}
		});
	});

	app.get('/polls/get', function(req, res) {
		var userName = req.query.userName;
		if (userName != "undefined") {
			poll.find({
				userName: userName
			}, function(err, polls) {
				if (err) {
					res.json({
						success: false,
						message: err
					});
				}
				else {
					res.json(polls);
				}

			});
		}

		else {
			poll.find({}, function(err, polls) {
				if (err) {
					res.json({
						success: false,
						message: err
					});
				}
				else {
					res.json(polls);
				}
			});
		}

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
						token: token,
						userName: req.body.username
					});
				}

			}

		});
	});


	app.route('/').get(function(req, res) {
		res.sendFile(path + '/public/index.html');
	});




};
