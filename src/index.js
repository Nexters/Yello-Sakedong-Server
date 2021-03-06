const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const app = module.exports = express();

//DB connect setting
const dbConfig = require('./config/database.config');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {useNewUrlParser : true})
    .then(() => {
        console.log("connect DB success");
    })
    .catch(err => {
        console.log("could not connect to the database. \n" + err);
        error :err
	});
	
// Routes which should handle requests
const userRoutes = require('../src/routes/user');
const foodRoutes = require('../src/routes/food');
const outputRoutes = require('../src/routes/output');


//CORS Settings
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
	  "Access-Control-Allow-Headers", 
	  "Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === "OPTIONS") {
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");  
	return res.status(200).json({});
	}
	next();
  });
	
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

app.use("/user", userRoutes);

app.use(function(req, res, next) {
	const msgs = req.session.messages || [];

	res.locals.messages = msgs;

	res.locals.hasMessages = !! msgs.length;

	next();
	req.session.messages = [];
});

app.use("/user", userRoutes);
app.use("/food", foodRoutes);
app.use("/output", outputRoutes);

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
