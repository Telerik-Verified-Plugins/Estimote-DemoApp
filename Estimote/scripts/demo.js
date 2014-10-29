// define a beacon callback function
function onBeaconsReceived(result) {
    if (result.beacons && result.beacons.length > 0) {
        var msg = "Beacons found: " + result.beacons.length + "<br/>";
        for (var i=0; i<result.beacons.length; i++) {
            var beacon = result.beacons[i];
            msg += "<br/>";
            if (beacon.color !== undefined) {
                msg += "Color: " + beacon.color + "<br/>";
            }
            if (beacon.macAddress !== undefined) {
                msg += "Mac Address: " + beacon.macAddress + "<br/>";
            }
            msg += "Distance: " + beacon.distance + " m<br/>";
            msg += "Major / Minor: " + beacon.major + " / " + beacon.minor + "<br/>";
            msg += "Rssi: " + beacon.rssi + "<br/>";
        }
        document.getElementById('beaconlog').innerHTML = msg;
    }
}

// wiring the fired event of the plugin to the callback function
document.addEventListener('beaconsReceived', onBeaconsReceived, false);

(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        start: function () {
            if (!this.checkSimulator()) {
                window.estimote.startRanging("Telerik");
            }
        },

        stop: function () {
            if (!this.checkSimulator()) {
                window.estimote.stopRanging();
            }
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.estimote === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);