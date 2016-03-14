/**
 * Created by Taru on 9.3.2016.
 */

/*
 Server side application entry point
 */

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/*
 Define our application
 */
var app = express();

// bodyparser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Routes
var routes = require('./server/routes/routes')(app);

// app.use statements for directories
app.use('/app', express.static(__dirname + '/app'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Database connectivity
mongoose.connect('mongodb://localhost:27017/avatars');

// Return of our SPA page
app.get('/', function(req, res) {
   res.sendFile(__dirname + '/app/views/index.html');
});

app.listen(3000, function(){
    console.log('Listening for connections on port: 3000');
});