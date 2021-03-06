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

const fs = require('fs');
const whole_string = fs.readFileSync(path.join('data','words_alpha.txt')).toString();
var all_words = '';
if (whole_string.includes('\r\n'))
    all_words = whole_string.split('\r\n');
else
    all_words = whole_string.split('\n');
//console.log(all_words);

var answer = "";

app.get('/', function(req, res){
    var files = fs.readdirSync('static/img/');
    idx = Math.floor((Math.random() * (files.length)));
    console.log(files);
    console.log(idx);
    filename = files[idx];
    answer = filename.split('.')[0];
    params = {'answer' : answer}
    res.render('home', params);
});

app.get('/check', function(req, res){
    var word = req.query.word
    var real;

    console.log(word)
    
    if(all_words.includes(word)){
        real = Boolean(true);
    } else {
        real = Boolean(false);
    }
    
    console.log(real)
    var params = {
        'real' : real,
        'word' : word,
        'answer' : answer
    }
    res.json(params)
});

// listener - keeps node 'alive.'
var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});
