var express = require('express');

var app = express();

app.get('/', function(request, response) {
    response.sendfile(__dirname + '/index.html');
});

app.configure(function() {
    app.use('/css', express.static(__dirname + '/css'));
    app.use('/img', express.static(__dirname + '/img'));
    app.use('/js', express.static(__dirname + '/js'));
    app.use('/lib', express.static(__dirname + '/lib'));
    app.use('/movies', express.static(__dirname + '/movies'));
    app.use('/favicon.ico', express.static(__dirname + '/favicon.ico'));
});

var port = process.env.PORT || 8000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});

