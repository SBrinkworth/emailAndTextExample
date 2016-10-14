var moment = require('moment');

var cronText = function() {
	return {
		run: function(info, twilio) {
			var message;

			if (info.user.name.full) {
				message = 'Hello ' + info.user.name.full;
			} else {
				message = 'Hello ' + info.user.name;
			}

			message += ',\n\nOn ' + moment()
				.add(1, 'd')
				.format('dddd MMM Do') + '\nDrive \"' + info.drive.name + '\" in Case \"' + info.drive.case.name + '\", should be brought in for backup.\n\nInfo:\nS/N: ' + info.drive.serial_number + " \nType: " + info.drive.backup_type + "\nLast Backup: " + new Date(info.drive.last_backup_date)
				.toLocaleDateString("en-US") + '\nLocation: ' + info.drive.location.name;

			twilio.messages.create({
				to: info.user.notifications.number,
				from: "+18013968585",
				body: message
			}, function(err, message) {
				if (err) {
					console.log(err);
				} else {
					console.log('Message sent: ' + message);
				}
			});

			return;
		}
	};
};

module.exports = cronText();
