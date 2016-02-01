hapi-dropzone
=============

This is a simple implementation of DropzoneJS using hapi.js as the backend.

I've set this up for my own personal purposes, so that I can easily transfer files to my local server. There is nothing secure about this setup and it should not be exposed to the public internet.

This project includes sourcecode and images from [DropzoneJS](http://www.dropzonejs.com/).

To set this project up:

`git clone $repo`

`cd hapi-dropzone`

`npm install`

`node app.js`

Note: By default, files will be downloaded to the uploads directory included in this project. This can be overriden in the app.js file.

To set this application to start on boot:

`sudo cp deploy/hapi-dropzone.service /etc/systemd/system/.`

`sudo systemctl start hapi-dropzone.service`
`sudo systemctl status hapi-dropzone.service`
`sudo systemctl enable hapi-dropzone.service`
