module.exports = function(request, response, next) {
    // get time when the variable starts to run
    var start = +new Date();
    // + sign converts date Object to milliseconds elapsed since Jan 1, 1970 (Unix community)
    var stream = process.stdout;
    // standard out is writeable stream which we will be writing log to
    var url = request.url;
    var method = request.method;
    // request object gives the requested URL and the HTTP method used
    
    // need an event emitter to listen to events
    response.on('finish', function() {
        var duration = +new Date() - start;
        // this calculates the duration of the request
        var message = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n';
            // add two linebreaks at the end to make it easier to read in the console
        stream.write(message);
        // pass message as argument to write
        });
    next();
    }
