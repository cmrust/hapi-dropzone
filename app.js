var Hapi = require('hapi');
var fs = require('fs');
var Path = require('path');

// downloadPath can be set to any location you have write access to
// by default we will send files to the included uploads directory
var downloadPath = Path.join(__dirname, 'uploads')
//var example_downloadPath = '/home/user/Downloads/'

var server = new Hapi.Server();
server.connection({ host: "0.0.0.0", port: 8114 });

server.route({ 
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        console.log('Received request to load /');
        reply.file('index.html');
    },
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
    }
});

server.route({
    method: 'POST',
    path: '/upload',
    config: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data',
            // raise file size upload limit from 1MB to 256MB
            maxBytes: 268435456
        },
        handler: function (request, reply) {
            if (request.payload.file) {
                var upload = request.payload.file;

                var name = upload.hapi.filename;
                console.log('Received request to upload', name);

                var file = fs.createWriteStream(Path.join(downloadPath, name));

                file.on('error', function (err) {
                    console.error(err);
                    reply(JSON.stringify({ "statusCode": 500, "error": err, "message": "An internal server error occurred"}));
                });

                upload.pipe(file);

                upload.on('end', function (err) { 
                    reply(JSON.stringify({ "statusCode": 200, "message": name+" received successfully" }));
                });
            } else {
              reply(JSON.stringify({ "statusCode": 400, "error": "Bad Request", "message": "upload request failed" }));
            }
        }
    }
});


server.start(function () {
    console.log('Server running at: ', server.info.uri);
});
