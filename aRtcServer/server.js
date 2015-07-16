'use strict';

var express = require('express');
var app = express();

var ExpressPeerServer = require('peer').ExpressPeerServer;
// var opentok = require('./opentok');


var server = app.listen(9000);

var options = {
    debug: true
}

app.use('/peer', ExpressPeerServer(server, options));

// app.use('/opentok', opentok) // wip

// var PeerServer = require('peer').PeerServer;
// var server = PeerServer({port: 9000, path: '/webrtc'});

