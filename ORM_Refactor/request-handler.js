
var url = require('url');
var orm = require("./orm.js");


var mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css'
};

// var newDB = require('./database.js').newDB;

// var data = newDB.readAll();

exports.handler = function(req, response) {

  //-------Build Response -----
  //Building a response header
  var statusCode;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  if (req.method === 'OPTIONS') {
    headers['Allow'] = 'HEAD,GET,PUT,DELETE,OPTIONS';
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();
    return;
  }
   if (req.method === 'GET') {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    orm.getMessages(response);    
  }

  if (req.method === 'POST'){
    statusCode = 201;
    console.log("In POST");
    response.writeHead(statusCode, headers);
    req.on('data',function(chunk){
      var message = JSON.parse(chunk.toString());
      orm.postMessage(message,response);
    });
  }
};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};