/*global parseUrlencoded*/
var express = require('express');
var router = express.Router();
// returns router instance which can be mounted as middleware
var bodyParser = require('body-parser');
var parserUrlencoded = bodyParser.urlencoded({ extended: false });

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
    };
// build router object
router.route('/') 
/*root path relative to path where it's mounted in app.js*/
    .get(function(request, response) {
       if (request.query.limit >= 0 && request.query.limit < blocks.length) {
           response.json(Object.keys(blocks.slice(0, request.query.limit)));
       } else {
           response.json(Object.keys(blocks)); 
       }
    })
    
    .post(parseUrlencoded, function(request, response) {
            var newBlock = request.body;
            blocks[newBlock.name] = newBlock.description;
            // sets 201 Created status code
            response.status(201).json(newBlock.name);
            });

router.route('/:name')
    .all(function(request, response, next) {
        var name = request.params.name;
        var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
        request.blockName = block;
        next();
    })
    // Delete route
    .delete(function(request, response) {
       delete blocks[request.blockName];
       response.sendStatus(200);
    })
    // create a dynamic route
    .get(function(request, response) {
        var description = blocks[request.blockName];
        
        // handle error if no property is found for a given Block name
        // check for presence of a description
        if (description) {
            response.json(description);
        } else {   
            // display the status and a message
            response.status(404).json('No description found for ' + request.params.name); 
        } 
    });


module.exports = router;
// exports module as node module