function onBeaconsReceived(msg) {
    document.getElementById('beaconlog').innerHTML = JSON.stringify(msg, null, "\t");
}

document.addEventListener('beaconsReceived', onBeaconsReceived, false);

(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        start: function () {
            if (!this.checkSimulator()) {
                window.estimote.startListening("Telerik");
            }
        },

        stop: function () {
            if (!this.checkSimulator()) {
                window.estimote.stopListening();
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