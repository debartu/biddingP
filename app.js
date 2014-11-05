// require modules
var express	= require('express');
var session = require('express-session')
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('./auth'); //passport registration

var port = process.env.PORT || 1337;

var app = express();
var server = require('http').Server(app);

global.io = require('socket.io')(server);

// configure application
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//set up Authentification
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

// use the implemented middleware
app.use(bodyParser());

require('./io/io.js');


// define routes
app.use(require('./routes/login'));

// start server and include socket.io
server.listen(port, function(){
	console.log('Mikey is ready on port ' + port);
});


