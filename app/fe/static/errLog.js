'use strict';
(function (window) {
    window.onerror = function (msg, fileUrl, line, col, error) {
        var http = new XMLHttpRequest();
        http.open("POST", window.location.origin + window.ROOT_CONTEXT + '/api/v1/error-log/');

        // Send the proper header information along with the request
        http.setRequestHeader("Content-Type", "application/json");
        http.setRequestHeader('x-access-token', window.location.search.split('token=')[1]);

        var log = {
            type: "error",
            msg: msg + " at " + fileUrl + " in line " + line,
            error: error,
            windowDotLocation: window.location
        };

        http.send(JSON.stringify(log));
    };
})(window);