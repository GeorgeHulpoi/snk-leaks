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
        timeout: 10 * 1000,
        method: 'GET',
        headers: headers
    };
    request(options, function (error, response, body) {
        if (typeof body === "undefined" || error || response.statusCode != 200) {
            callback(error, response, body);
            return;
        }
        var _body = body;
        _body = _body.replace(/(\r\n\t|\n|\r\t)/gm, "");
        _body = _body.replace(/<script[^<>]*?>[^<>]*?<\/script>/g, "");
        callback(error, response, _body);
    });
}
exports.Download = Download;
