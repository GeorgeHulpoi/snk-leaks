"use strict";
exports.__esModule = true;
var crawler_1 = require("../crawler");
var download_1 = require("../download");
var BaiduCrawler = (function () {
    function BaiduCrawler() {
        this.List = [];
    }
    BaiduCrawler.prototype.reset = function () {
        this.List = [];
    };
    BaiduCrawler.prototype.crawl = function (callback) {
        this.check(callback);
        console.log('Baidu ran at ' + (new Date()).toLocaleTimeString());
    };
    BaiduCrawler.prototype.check = function (callback) {
        var _this = this;
        this.getThreads(function (list) {
            var len = list.length;
            for (var i = 0; i < len; ++i) {
                _this.List.push(list[i]);
                crawler_1.Crawler.Interceptor({
                    message: 'Baidu new thread',
                    link: 'https://tieba.baidu.com/p/' + list[i]
                });
            }
            callback();
        });
    };
    BaiduCrawler.prototype.getThreads = function (callback) {
        var _this = this;
        download_1.Download('https://tieba.baidu.com/f?kw=%E8%BF%9B%E5%87%BB%E7%9A%84%E5%B7%A8%E4%BA%BA%E5%88%86%E6%9E%90&ie=utf-8', function (error, response, body) {
            var List = [];
            if (error != null) {
                console.log('Error in MaruMaru crawler at Download function.');
                console.log(error);
                callback();
                return;
            }
            var HTMLContent = body;
            var data = HTMLContent.match(/<ul\s*id="thread_list"\s*class="threadlist_bright j_threadlist_bright">[^\n]*?<\/ul>\s*<div\s*class="thread_list_bottom clearfix">/g);
            if (data == null) {
                console.log('Baidu crawler it\'s outdated!');
            }
            HTMLContent = data[0];
            var Article;
            while ((Article = (/<a[^<>]*?href="\/p\/([0-9]*)"[^<>]*?class="\s*j_th_tit\s*"[^<>]*?>/g).exec(HTMLContent)) != null) {
                HTMLContent = HTMLContent.replace(Article[0], "");
                var data2 = Article[0].match(/title="[^"]*?105[^"]*?"/g);
                if (data2 != null) {
                    var nr = Number(Article[1]);
                    if (_this.List.indexOf(nr) == -1) {
                        List.push(nr);
                    }
                }
            }
            callback(List);
        });
    };
    return BaiduCrawler;
}());
exports.Baidu = new BaiduCrawler();
