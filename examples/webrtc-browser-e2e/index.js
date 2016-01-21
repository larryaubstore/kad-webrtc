'use strict';

var kademlia = require('kad');
var WebRTC = require('../..');
var webSocket = require('./web-socket');
var SignalClient = require('./signal-client');
var EventEmitter = require('events').EventEmitter;

document.getElementById("nodeOne").onclick = function () {

  alert("nodeOne");
  var signalClient1 = new SignalClient('node1');
  // Create our first node
  window.node1 = new kademlia.Node({
    transport: new WebRTC(new WebRTC.Contact({
      nick: 'node1'
    }), { signaller: signalClient1 }),
    storage: new kademlia.storage.LocalStorage('node1')
  });


//  node1.put('beep', 'boop', function(err) {
//    if(err) {
//        throw err;
//    }
//  });


};

document.getElementById("nodeTwo").onclick = function () {

  alert("nodeTwo");
  var signalClient2 = new SignalClient('node2');
  // Create a second node
  window.node2 = new kademlia.Node({
    transport: new WebRTC(new WebRTC.Contact({
      nick: 'node2'
    }), { signaller: signalClient2 }),
    storage: new kademlia.storage.LocalStorage('node2')
  });

  window.node2.on('connect', onConnect);

  window.node2.connect({ nick: 'node1' });


  function onConnect() {
      window.node2.put('beep', 'boop', function(err) {
          if(err) {
              throw err;
          }
      });
  }

 
};


document.getElementById("getButton").onclick = function () {

  window.node1.get('beep', onGet);

  function onGet(err, value) {
    alert(value); // 'boop'
  }
};

//webSocket.on('open', function() {
//
//
//
//
//});
