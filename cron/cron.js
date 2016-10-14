// Require
var config = require('../config');
var CronJob = require('cron')
	.CronJob;

// twilio
var accountSid = config.twilio_sid;
var authToken = config.twilio_auth_token;

var twilio = require('twilio')(accountSid, authToken);

// Cron
module.exports = {

	// Start CronJob
	start: function() {
		console.log('Cron initiated');


		new CronJob(
			'*/10 * * * * *', // Time of Day
			// '*/10 * * * * *', // Every 10 seconds (testing purposes only)
			function() {

				var message = "THIS IS A VERY FUNNY MESSAGE";

				twilio.messages.create({
					to: '8017879852',
					from: "+18013968585",
					body: message
				}, function(err, message) {
					if (err) {
						console.log(err);
					} else {
						console.log('Message sent: ' + message);
					}
				});
			}, // Job
			null, // Job Stop
			true, // Start Now
			'' // Time zone
		);
	}
};
