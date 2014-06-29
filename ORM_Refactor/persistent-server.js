var http = require("http");
var rh = require("./request-handler.js");

var port = 3500;

var server = http.createServer(rh.handler);
// console.log("Listening on http://" + ip + ":" + port);
server.listen(port);

