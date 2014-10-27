(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        enablePinning: function () {
            if (!this.checkSimulator()) {
                window.cordovaHTTP.enableSSLPinning(
                    true,
                    function (msg) {alert("SUCCESS, you can now talk only to trusted endpoints (on iOS this may take a few seconds to take effect)")},
                    function (msg) {alert("ERROR: "   + msg)}
                );
            }
        },

        disablePinning: function () {
            if (!this.checkSimulator()) {
                window.cordovaHTTP.enableSSLPinning(
                    false,
                    function (msg) {alert("SUCCESS: you can now talk to any endpoint")},
                    function (msg) {alert("ERROR: "   + msg)}
                );
            }
        },

        doTrustedGET: function () {
            if (!this.checkSimulator()) {
                window.cordovaHTTP.get(
                    "https://cordova.apache.org", // we have a .cer file for this in www/certificates
                    {}, // optional params
                    {}, // optional headers
                    function(msg) {alert("OK: " + msg)},
                    function(msg) {alert("ERROR: " + msg)}
                )
            }
        },

        doUntrustedGET: function () {
            if (!this.checkSimulator()) {
                window.cordovaHTTP.get(
                    "https://www.github.com", // we don't have a .cer file for this
                    {}, // optional params
                    {}, // optional headers
                    function(msg) {alert("OK: " + msg)},
                    function(msg) {alert("ERROR: " + msg)}
                )
            }
        },

        setBasicAuthCredentials: function () {
            if (!this.checkSimulator()) {
                window.cordovaHTTP.useBasicAuth(
                    "user",
                    "passwd",
                    function(msg) {alert("OK, basic auth headers set: " + msg)},
                    function(msg) {alert("ERROR: " + msg)}
                )
            }
        },
        
        requestBasicAuthProtectedResource: function () {
            if (!this.checkSimulator()) {
                window.cordovaHTTP.get(
                    "http://httpbin.org/basic-auth/user/passwd",
                    {}, // optional params
                    {}, // optional headers
                    function(msg) {alert("OK, basic auth resource responded: " + msg)},
                    function(msg) {alert("ERROR, now press the 'Set global basic auth header' and test again")}
                )
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