/*************************************************************
You should implement your request handler function in this file.
requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.
You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.
*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.
**************************************************************/
var messageData = {results: []};

//everything after "127.0.0.1/3000" <-- url that we want to mess with. 
var requestHandler = function(request, response) {
  var urlObj = {
    '/classes/messages': true, 
    '/classes/room': true,
    '/classes/room1': true, 
    '/?order=-createdAt': true
  }; 
  console.log("Serving request type " + request.method + " for url " + request.url);
  console.log(messageData);
  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  if (request.method === 'OPTIONS') {
    headers['Content-Type'] = "text/plain";
    response.writeHead(statusCode, headers);
    response.end();

  } else if (request.method === 'GET') { 
    if(urlObj.hasOwnProperty(request.url)){ //checking for url
      headers['Content-Type'] = "application/json";
      response.writeHead(statusCode, headers);
      console.log(messageData, " is our message data! :D ");
      response.end(JSON.stringify(messageData));
    } else {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.end(); 
    }
      
  } else if (request.method === 'POST') {

      var body = ''; 
      request.on('data', function(chunk){
        body += chunk; 
      });

      request.on('end', function(){
        messageData.results.push(JSON.parse(body));
      });

      headers['Content-Type'] = "application/json";
      response.writeHead(201, headers);
      response.end(JSON.stringify(messageData));
  }

};


exports.requestHandler = requestHandler;
// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};