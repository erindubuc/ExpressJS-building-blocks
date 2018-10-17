
// lack of semi-colons for static
exports = module.exports = function serveStatic(root, options) {
    
    return function serveStatic(req, res, next) {
        if(req.method !== 'GET' && req.method !== 'HEAD') {
            return next()
            } 
        
        stream.pipe(res)
        // pipes content to response object
        }
    
    
    }