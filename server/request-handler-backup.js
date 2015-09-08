/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

//set global variable to host the array of objects that will be sent to the server in chunks
var data = {results: []};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': 'application/json'
};

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);


    if (request.method === 'OPTIONS') {
          console.log('!OPTIONS? '+ defaultCorsHeaders['access-control-allow-methods']);

          response.writeHead(200, defaultCorsHeaders);
          response.end();
    } 
   

    else if (request.method === 'GET') {
    if (request.url === '/classes/messages') {

      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(data)); //I WANT DATA :D 

    } else if (request.url === 'classes/room1'){

      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(data)); 

    }else {

      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(data)); 

    }

  } else if (request.method === 'POST') {
    
    var body = ''; 
    request.on('data', function(chunk){
      body+=chunk;
    });
    request.on('end', function(){
      data.results.push(JSON.parse(body));
    });

    if (request.url === '/classes/messages') {

      request.on("data", function(chunk){ //an event listener, listening for data
        //push data objects into data.result array
        data.results.push(chunk);
        console.log("this is the data! " + data);
      });

      request.on("end", function() {
        console.log("Posted: " + data);
        response.writeHead(201, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(data));
      });

    } else if (request.url === '/ classes/room1') {
      response.writeHead(201, {'Content-Type': 'application/json'});
      response.end();
    
    } else {

      response.writeHead(201, {'Content-Type': 'application/json'});
      response.end();

    }
  }
};


exports.requestHandler = requestHandler;



  // // The outgoing status.
  // var statusCode = 200;

  // // See the note below about CORS headers.
  // var headers = defaultCorsHeaders;

  // // Tell the client we are sending them plain text.
  // //
  // // You will need to change this if you are sending something
  // // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = "text/plain";
  // // headers['Content-Type'] = 'application/json';

  // // .writeHead() writes to the request line and headers of the response,
  // // which includes the status and all headers.
  // response.writeHead(statusCode, headers);

  // // Make sure to always call response.end() - Node may not send
  // // anything back to the client until you do. The string you pass to
  // // response.end() will be the body of the response - i.e. what shows
  // // up in the browser.
  // //
  // // Calling .end "flushes" the response's internal buffer, forcing
  // // node to actually send all the data over to the client.
  // response.end();

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.




  // var postData = querystring.stringify({
//     'msg' : 'Hello World!'
//    });

//   var options = {
//     path: '/classes/room1', 
//     method: 'GET', 
//     headers: defaultCorsHeaders
//   };

//   var req = http.request(options, function(res) {
//     console.log('STATUS: ' + res.statusCode);
//     console.log('HEADERS: ' + JSON.stringify(res.headers));
//     res.setEncoding('utf8');
//     res.on('data', function (chunk) {
//       console.log('BODY: ' + chunk);
//     });
//   });

//   req.on('error', function(e){
//     console.log('problem with request: '+e.message);
//   });

//   req.write(postData); 
//   req.end();

//   /*
// req.on('error', function(e) {
//   console.log('problem with request: ' + e.message);
// });

// // write data to request body
// req.write(postData);
// req.end();
//   */
