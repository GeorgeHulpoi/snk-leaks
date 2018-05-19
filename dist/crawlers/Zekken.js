"use strict";
exports.__esModule = true;
var download_1 = require("../download");
var crawler_1 = require("../crawler");
var ZekkenCrawler = (function () {
    function ZekkenCrawler() {
        this.lastArticle = 0;
    }
    ZekkenCrawler.prototype.reset = function () {
        this.lastArticle = 0;
    };
    ZekkenCrawler.prototype.crawl = function (callback) {
        var day = (new Date()).getUTCDate();
        if (day >= 3 && day <= 7) {
            console.log('Zekken ran at ' + (new Date()).toLocaleTimeString());
            this.check(callback);
        }
    };
    ZekkenCrawler.prototype.check = function (callback) {
        var _this = this;
        download_1.Download('http://m.tw.weibo.com/zekken', function (error, response, body) {
            if (error != null) {
                console.log('Error in Zekken crawler at Download function.');
                console.log(error);
                callback();
                return;
            }
            var HTMLContent = body;
            var data = HTMLContent.match(/<ul\s*class="lists"\s*>.*?<\/ul>\s*<input/g);
            if (data == null) {
                console.log('Zekken crawler it\'s outdated!');
                callback();
                return;
            }
            HTMLContent = data[0];
            var first = 0;
            var Article;
            while ((Article = (/<li\s*class="picone"\s*>(.*?)<\/li>\s*<!--/g).exec(HTMLContent)) != null) {
                HTMLContent = HTMLContent.replace(Article[0], "");
                var id = Number(((/<a\s*href="\/zekken\/([0-9]*)"\s*>/g).exec(Article[1]))[1]);
                if (first == 0) {
                    first = id;
                }
                if (_this.lastArticle == 0) {
                    _this.lastArticle = id;
                }
                if (_this.lastArticle == id) {
                    break;
                }
                var img = ((/<img[^<>]*?src="([^"]*?)"[^<>]*?>/g).exec(Article[1]))[1];
                crawler_1.Crawler.Interceptor({
                    message: 'Zekken posted new images',
                    link: 'http://m.tw.weibo.com/zekken/' + id,
                    img: img
                });
            }
            _this.lastArticle = first;
            callback();
        });
    };
    return ZekkenCrawler;
}());
exports.Zekken = new ZekkenCrawler();
