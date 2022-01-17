/* Do NOT add any more modules */
var http = require('http');
var url = require('url');

// TODO: Add more test data to work with
// test data must be an array of 'Pet' objects
var pets = [
  {
    "id": 0,
    "name": "doggie",
    "photoUrls": [
      "http://google.com/"
    ],
    "tags": [
      "tag1"
    ],
    "status": "available"
  },
  {
    "id": 3,
    "name": "catapalooza",
    "photoUrls": [
      "https://www.yahoo.com/"
    ],
    "tags": [],
    "status": "sold"
  }
];

http.createServer(function (req, res) {
    // TODO: Implement routes from API Spec

    /* Catch-All */
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.write("Not Found")
    res.end();
}).listen(8000);
console.log('Server running at http://localhost:8000');
