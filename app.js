var express = require('express');
// calling the express function gives an application instance
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
// call urlencoded - forces use of nodes native query parser module - querystring
// return value is middleware function which we store in parseUrlendcoded var
// create endpoint for posting to block's path
// routes can take multiple handlers as arguments

// in order to store additional info on blocks - need to make a JS object vs an array
var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
    };

app.post('/blocks', parseUrlencoded, function(request, response) {
    var newBlock = request.body;
    blocks[newBlock.name] = newBlock.description;
    // sets 201 Created status code
    response.status(201).json(newBlock.name);
    });
app.get('/blocks', function(request, response) {
    response.json(Object.keys(blocks));
    });
    
var locations = {
    'Fixed': 'First floor',
    'Movable': 'Second floor',
    'Rotating': 'Penthouse'
    };
    
    app.param('name', function(request, response, next) {
        // var description = blocks[request.params.name];
        // doing two things - reading request param and looking up the object's properties, so we split it up to improve
        var name = request.params.name;
        var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
        
        request.blockName = block;
        // assign block variable to new property on request object
        // blockName can be accessed by all routes in app
        next();
        });
    
    app.get('/blocks/:name', function(request, response) {  
        
        var description = blocks[request.blockName];
        // block name is now in the same format as the properties in blocks object
        if (!description) {
            response.status(404).json('No description found for ' + request.params.name);
            } else {
              response.json(description);
            // response defaults to 200 Success status code  
            }
        
        });
    
    app.get('/locations/:name', function(request, response) {
        var location = locations[request.blockName];
        });

// binds application to tcp port 8080
app.listen(8080);