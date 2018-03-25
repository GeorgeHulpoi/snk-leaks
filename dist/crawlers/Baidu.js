"use strict";
exports.__esModule = true;
var https = require('https');
var BaiduCrawler = (function () {
    function BaiduCrawler() {
    }
    BaiduCrawler.prototype.crawl = function (callback) {
        if (typeof callback === "function") {
            callback('Baidu called');
        }
    };
    return BaiduCrawler;
}());
exports.Baidu = new BaiduCrawler();
