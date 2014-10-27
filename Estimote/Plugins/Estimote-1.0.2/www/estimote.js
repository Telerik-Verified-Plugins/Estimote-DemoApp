var cordova = require('cordova');
var exec = require('cordova/exec');

function Estimote(){
}

Estimote.prototype.startListening = function(arg) {
  exec(estimote._notification, estimote._error, "Estimote", "startListening", [encodeURIComponent(arg)]);
};

Estimote.prototype.stopListening = function() {
  exec(null, null, "Estimote", "stopListening", []);
};

Estimote.prototype._notification = function(info) {
  cordova.fireDocumentEvent("beaconsReceived", info);
};

Estimote.prototype._error = function(e) {
  console.log("Error receiving message: " + e);
};

var estimote = new Estimote();

module.exports = estimote;
