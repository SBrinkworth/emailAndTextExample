'usestrict';

// Requires
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require("./config");
var textCtrl = require('./controllers/textCtrl');
var emailCtrl = require('./controllers/emailCtrl');

var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());


app.post('/api/text', textCtrl.sendTexts);
app.post('/api/email', emailCtrl.sendEmail);



// Cron Job
var cron = require('./cron/cron.js');
// cron.start();


// Listen
var port = config.PORT;

app.listen(port, function() {
	console.log('Listening on port', port);
});
