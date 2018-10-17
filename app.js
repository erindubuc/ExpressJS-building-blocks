var express = require('express');
// calling the express function gives an application instance
var app = express();

var logger = require('./logger'); 
// var logger requires the local module with ./ to use it - not an NPM mod
app.use(logger);
// add to stack with app.use

app.use(express.static('public'));

app.get('/blocks', function(request, response) {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    response.json(blocks);
    });


// binds application to tcp port 8080
app.listen(8080, function() {
    console.log('Listening on port 8080 \n');
    });