var express = require('express');
var app = express();

// add middleware to app stack
app.use(express.static('public'));

var blocks = require('./routes/blocks'); /*routes moved to new file*/
var buildings = require('./routes/buildings');
var users = require('./routes/users');


app.use('/blocks', blocks); /*router is mounted in particular root URL*/
/*all requests to blocks path are dispatched to this route*/
// app.use('/buildings', buildings);
// app.use('/users', users);
    

// binds application to tcp port 8080
app.listen(8080, function() {
    console.log('listening on port 8080 \n');
    });