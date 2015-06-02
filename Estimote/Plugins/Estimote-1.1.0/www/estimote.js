var cordova = require('cordova');
var exec = require('cordova/exec');

function Estimote(){
}

Estimote.prototype.startRanging = function(arg) {
  var options = {};

  // added for backward compatibility
  if (typeof arg == "object") {
    options = arg;
  } else if (typeof arg == "string") {
    options.region = arg;
  }

  exec(estimote._notification, estimote._error, "Estimote", "startRanging", [options]);
};

Estimote.prototype.stopRanging = function() {
  exec(null, null, "Estimote", "stopRanging", []);
};

Estimote.prototype._notification = function(info) {
  cordova.fireDocumentEvent("beaconsReceived", info);
};

Estimote.prototype._error = function(e) {
  console.log("Error receiving message: " + e);
};

var estimote = new Estimote();

module.exports = estimote;
