var config = require('../config');

// twilio
var accountSid = config.twilio_sid;
var authToken = config.twilio_auth_token;

var twilio = require('twilio')(accountSid, authToken);

module.exports = {
	sendTexts: function(req, res, next) {
		console.log(req.body.to);

		twilio.messages.create({
			to: req.body.to,
			from: "+18013968585",
			body: req.body.message
		}, function(err, message) {
			if (err) {
				console.log(err);
				res.send(err);
			} else {
				console.log('Message sent: ' + message);
				res.send(message);
			}
		});
	}
};
