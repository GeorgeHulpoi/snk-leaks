"use strict";
exports.__esModule = true;
var requestModule = require('request');
var jar = requestModule.jar();
var request = requestModule.defaults({ jar: jar });
var UserAgent = 'Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36';
var Timeout = 6000;
function Download(url, callback) {
    var headers = {};
    headers['User-Agent'] = UserAgent;
    var options = {
        url: url,
        method: 'GET',
        headers: headers
    };
    request(options, function (error, response, body) {
        callback(error, response, body);
    });
}
exports.Download = Download;
