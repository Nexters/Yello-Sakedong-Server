const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = module.exports = express();

const index = require('./routes/index');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.response.message = function(msg) {
	const sess = this.req.session;
	sess.messages = sess.messages || [];
	sess.messages.push(msg);
	return this;
};

app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'secret key is here'
}));

app.use(express.urlencoded({extended: true}));

app.use(function(req, res, next) {
	const msgs = req.session.messages || [];

	res.locals.messages = msgs;

	res.locals.hasMessages = !! msgs.length;

	next();
	req.session.messages = [];
});

app.use('/', index);

app.use(function(err, req, res, next) {
	if(!module.parent) console.error(err.stack);

	res.end('5xx error');
});

app.use(function(req, res, next) {
	res.end('404 error', {url: req.originalUrl});
});

if(!module.parent) {
	app.listen(3000);
	console.log('port 3000');
}
