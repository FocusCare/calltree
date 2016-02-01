var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

// view engine setup
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'test')));

app.set('views', path.join(__dirname, 'test'));
app.set('view engine', 'jade');

app.use('/', function(req, res) {
    res.render('index');
});

var server = http.createServer(app);

server.listen(3000, function() {
    console.log('test calltree is running');
});
