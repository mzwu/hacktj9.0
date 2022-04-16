#!/usr/bin/nodejs

// initialize express and app class object
var express = require('express');
const { AuthorizationCode } = require('simple-oauth2');
var app = express();

// initialize handlebars templating engine
var hbs = require('hbs');
app.set('view engine', 'hbs');

var https = require('https');
app.set('trust proxy', 1); // trust first proxy

var cookieParser = require('cookie-parser');
app.use(cookieParser());

// initialize the built-in library 'path'
var path = require('path');
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res){
    res.render('home');
});

// listener - keeps node 'alive.'
var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});