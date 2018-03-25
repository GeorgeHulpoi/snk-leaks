"use strict";
exports.__esModule = true;
var https = require('https');
var YonkouCrawler = (function () {
    function YonkouCrawler() {
    }
    YonkouCrawler.prototype.crawl = function (callback) {
        if (typeof callback === "function") {
            callback('Yonkou called');
        }
    };
    return YonkouCrawler;
}());
exports.Yonkou = new YonkouCrawler();
