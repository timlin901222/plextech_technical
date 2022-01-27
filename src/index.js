/* Do NOT add any more modules */
var http = require('http');
var url = require('url');
var database = require("./controllers/pets");

http.createServer(async (req, res) => {
    const q = url.parse(req.url, true);
    
    // TODO: Implement routes from API Spec

    /* Catch-All */
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.write("Not Found")
    res.end();
}).listen(8000);
console.log('Server running at http://localhost:8000');
