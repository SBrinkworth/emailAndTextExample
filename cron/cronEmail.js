var moment = require('moment');

var cronEmail = function() {
	return {
		run: function(info, mail) {
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

			var mailOptions = {
				from: 'backupminder@sanityworx.com',
				to: info.user.notifications.email,
				subject: 'Bring Backup Drive',
				text: message
			};

			mail.sendMail(mailOptions, function(error, info) {
				if (error) {
					console.log(error);
				} else
					console.log('Message sent: ' + info);
			});
		}
	};
};

module.exports = cronEmail();
