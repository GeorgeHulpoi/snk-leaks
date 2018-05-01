"use strict";
exports.__esModule = true;
var cloudscraper = require('cloudscraper');
var MaruMaruCrawler = (function () {
    function MaruMaruCrawler() {
        this.published = false;
    }
    MaruMaruCrawler.prototype.reset = function () {
        this.published = false;
    };
    MaruMaruCrawler.prototype.crawl = function (callback) {
        if (!this.published) {
            this.check(callback);
            console.log('MaruMaru runned at ' + (new Date()).toLocaleTimeString());
        }
    };
    MaruMaruCrawler.prototype.check = function (callback) {
        var _this = this;
        cloudscraper.get('https://marumaru.in/b/manga/82810', function (error, response, body) {
            if (error) {
            }
            else {
                var HTMLContent = body;
                HTMLContent = HTMLContent.replace(/(\r\n\t|\n|\r\t)/gm, "");
                HTMLContent = HTMLContent.replace(/<script[^<>]*?>[^<>]*?<\/script>/g, "");
                HTMLContent = HTMLContent.replace(/<script[^<>]*?>[^<>]*?<\/script>/g, "");
                var data = HTMLContent.match(/<a[^<>]*?href="(https?:\/\/wasabisyrup.com\/archives\/[^"]*?)"[^<>]*?>\s*<font[^<>]*?>\s*<span[^<>]*?>\s*진격의\s*거인\s*105\s*화\s*<\/span>\s*<\/font>\s*<\/a>/g);
                if (data != null) {
                    var match = data[0].match(/https?:\/\/wasabisyrup.com\/archives\/[a-zA-Z0-9-]*/g);
                    var link = match[0];
                    _this.published = true;
                    callback({
                        message: 'New chapter published on MaruMaru',
                        link: link
                    });
                }
                else {
                    callback();
                }
            }
        });
    };
    return MaruMaruCrawler;
}());
exports.MaruMaru = new MaruMaruCrawler();
