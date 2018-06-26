"use strict";
exports.__esModule = true;
var crawler_1 = require("../crawler");
var download_1 = require("../download");
var HupuCrawler = (function () {
    function HupuCrawler() {
        this.List = [];
        this.firstRun = true;
    }
    HupuCrawler.prototype.reset = function () {
        this.List = [];
    };
    HupuCrawler.prototype.crawl = function (callback) {
        console.log('Hupu ran at ' + (new Date()).toLocaleTimeString());
        this.check(callback);
    };
    HupuCrawler.prototype.check = function (callback) {
        var _this = this;
        this.getThreads(function (list) {
            if (typeof list !== "undefined") {
                var len = list.length;
                if (_this.firstRun) {
                    for (var i = 0; i < len; ++i) {
                        _this.List.push(list[i]);
                    }
                    _this.firstRun = false;
                }
                else {
                    for (var i = 0; i < len; ++i) {
                        _this.List.push(list[i]);
                        crawler_1.Crawler.Interceptor({
                            message: 'Hupu new thread',
                            link: 'https://bbs.hupu.com/' + list[i] + '.html'
                        });
                    }
                }
            }
            callback();
        });
    };
    HupuCrawler.prototype.getThreads = function (callback) {
        var _this = this;
        download_1.Download('https://bbs.hupu.com/acg', function (error, response, body) {
            var List = [];
            if (error != null) {
                console.log('Error in Hupu crawler at Download function.');
                console.log(error);
                callback();
                return;
            }
            var HTMLContent = body;
            var data = HTMLContent.match(/<div\s*class="bbs-content"\s*>.*?<\/div>\s*<div\s*class="bottom_tools"\s*>/g);
            if (data == null) {
                console.log('Hupu crawler it\'s outdated!');
                callback();
                return;
            }
            HTMLContent = data[0];
            var Article;
            while ((Article = (/<a[^<>]*?class="truetit"[^<>]*?>.*?<\/a>/g).exec(HTMLContent)) != null) {
                HTMLContent = HTMLContent.replace(Article[0], "");
                var name_1 = (/<a[^<>]*?>(.*?)<\/a>/g).exec(Article[0])[1];
                var id = Number(((/href="\/([0-9]*).html"/g).exec(Article[0]))[1]);
                if (_this.checkContent(name_1)) {
                    if (_this.List.indexOf(id) == -1) {
                        List.push(id);
                    }
                }
            }
            callback(List);
        });
    };
    HupuCrawler.prototype.checkContent = function (content) {
        var data = content.match(/(進撃|巨人|106)/g);
        return (data == null) ? false : true;
    };
    return HupuCrawler;
}());
exports.Hupu = new HupuCrawler();
