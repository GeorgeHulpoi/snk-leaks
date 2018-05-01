"use strict";
exports.__esModule = true;
var HTTP = require('https');
var BaiduCrawler = (function () {
    function BaiduCrawler() {
        this.List = [];
    }
    BaiduCrawler.prototype.reset = function () {
        this.List = [];
    };
    BaiduCrawler.prototype.crawl = function (callback) {
        this.getThreads(callback);
        console.log('Baidu runned at ' + (new Date()).toLocaleTimeString());
    };
    BaiduCrawler.prototype.getThreads = function (callback) {
        var _this = this;
        HTTP.get('https://tieba.baidu.com/f?kw=%E8%BF%9B%E5%87%BB%E7%9A%84%E5%B7%A8%E4%BA%BA%E5%88%86%E6%9E%90&ie=utf-8', function (response) {
            var HTMLContent = "";
            response.on('data', function (buffer) {
                HTMLContent += buffer.toString('utf8');
            });
            response.on('end', function () {
                HTMLContent = HTMLContent.replace(/(\r\n\t|\n|\r\t)/gm, "");
                var data = HTMLContent.match(/<ul\s*id="thread_list"\s*class="threadlist_bright j_threadlist_bright">[^\n]*?<\/ul>\s*<div\s*class="thread_list_bottom clearfix">/g);
                HTMLContent = data[0];
                var Article;
                while ((Article = (/<a[^<>]*?href="\/p\/([0-9]*)"[^<>]*?class="\s*j_th_tit\s*"[^<>]*?>/g).exec(HTMLContent)) != null) {
                    HTMLContent = HTMLContent.replace(Article[0], "");
                    var data2 = Article[0].match(/title="[^"]*?105[^"]*?"/g);
                    if (data2 != null) {
                        if (_this.List.indexOf(Article[1]) == -1) {
                            callback({
                                message: 'Baidu new thread',
                                link: 'https://tieba.baidu.com/p/' + Article[1]
                            });
                            _this.List.push(Article[1]);
                            return;
                        }
                    }
                }
                callback();
            });
        });
    };
    return BaiduCrawler;
}());
exports.Baidu = new BaiduCrawler();
