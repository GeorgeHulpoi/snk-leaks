"use strict";
exports.__esModule = true;
var download_1 = require("../download");
var MaruMaruCrawler = (function () {
    function MaruMaruCrawler() {
        this.published = false;
    }
    MaruMaruCrawler.prototype.reset = function () {
        this.published = false;
    };
    MaruMaruCrawler.prototype.crawl = function (callback) {
        if (this.published) {
            callback();
            return;
        }
        console.log('MaruMaru ran at ' + (new Date()).toLocaleTimeString());
        this.check(callback);
    };
    MaruMaruCrawler.prototype.check = function (callback) {
        var _this = this;
        download_1.Download('https://marumaru.in/b/manga/82810', function (error, response, body) {
            if (error != null) {
                console.log('Error in MaruMaru crawler at Download function.');
                console.log(error);
                callback();
                return;
            }
            var HTMLContent = body;
            HTMLContent = _this.CleanHTML(HTMLContent);
            var data = HTMLContent.match(/<a[^<>]*?href="https?:\/\/wasabisyrup.com\/archives\/[a-zA-Z0-9_-]*"[^<>]*?>\s*<font[^<>]*?>\s*<span[^<>]*?>\s*진격의\s*거인\s*105\s*화\s*<\/span>\s*<\/font>\s*<\/a>/g);
            if (data == null) {
                callback();
                return;
            }
            var match = data[0].match(/https?:\/\/wasabisyrup.com\/archives\/[a-zA-Z0-9_-]*/g);
            var link = match[0];
            _this.published = true;
            callback({
                message: 'New chapter published on MaruMaru',
                link: link
            });
        });
    };
    MaruMaruCrawler.prototype.CleanHTML = function (html) {
        var a = html;
        a = a.replace(/(\r\n\t|\n|\r\t)/gm, "");
        a = a.replace(/<script[^<>]*?>[^<>]*?<\/script>/g, "");
        return a;
    };
    return MaruMaruCrawler;
}());
exports.MaruMaru = new MaruMaruCrawler();
