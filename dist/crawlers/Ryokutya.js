"use strict";
exports.__esModule = true;
var download_1 = require("../download");
var RyokutyaCrawler = (function () {
    function RyokutyaCrawler() {
        this.lastArticle = 0;
    }
    RyokutyaCrawler.prototype.reset = function () {
        this.lastArticle = 0;
    };
    RyokutyaCrawler.prototype.crawl = function (callback) {
        console.log('Ryokutya ran at ' + (new Date()).toLocaleTimeString());
        callback();
    };
    RyokutyaCrawler.prototype.check = function (callback) {
        var _this = this;
        this.getAllArticles(function (list) {
            if (list == null) {
                callback();
                return;
            }
            var len = list.length;
            var before = _this.lastArticle;
            for (var i = 0; i < len; ++i) {
                if (Number(list[i]) > _this.lastArticle) {
                    _this.lastArticle = Number(list[i]);
                }
            }
            if (before != _this.lastArticle) {
                _this.checkArticle(_this.lastArticle, function (newest) {
                    if (newest == null) {
                        callback();
                        return;
                    }
                    if (newest) {
                        callback({
                            message: 'New post on Ryokutya',
                            link: 'http://ryokutya2089.com/archives/' + _this.lastArticle
                        });
                    }
                    else {
                        callback();
                    }
                });
            }
            else {
                callback();
            }
        });
    };
    RyokutyaCrawler.prototype.getAllArticles = function (callback) {
        var List = [];
        download_1.Download('http://ryokutya2089.com', function (error, response, body) {
            if (error != null) {
                console.log('Error in Ryokutya crawler at Download function.');
                console.log(error);
                callback();
                return;
            }
            var HTMLContent = body;
            var data = HTMLContent.match(/<div\s*id="primary"\s*class="site-content">.*?<\/div><!--\s*#primary\s*-->/g);
            if (data == null) {
                console.log('Ryokutya crawler it\'s outdated!');
                callback();
                return;
            }
            HTMLContent = data[0];
            HTMLContent = HTMLContent.replace(/<article[^<>]*?class="[^"]*?post-96[^"]*?"[^<>]*?>.*?<\/article><!-- #post -->/g, "");
            var Article;
            while ((Article = (/<article[^<>]*?id="post-(\d*)"[^<>]*?>/g).exec(HTMLContent)) != null) {
                HTMLContent = HTMLContent.replace(Article[0], "");
                List.push(Article[1]);
            }
            callback(List);
        });
    };
    RyokutyaCrawler.prototype.checkArticle = function (id, callback) {
        var _this = this;
        download_1.Download('http://ryokutya2089.com/archives/' + id, function (error, response, body) {
            if (error != null) {
                console.log('Error in Ryokutya crawler at Download function.');
                console.log(error);
                callback();
                return;
            }
            var HTMLContent = body;
            var data = HTMLContent.match(/<article\s*id="post-[0-9]*"\s*class="[^"]*?">.*?<\/article>/g);
            if (data == null) {
                console.log('Ryokutya crawler it\'s outdated!');
                callback();
                return;
            }
            HTMLContent = data[0];
            if (_this.checkContent(HTMLContent)) {
                callback(true);
            }
            else {
                callback(false);
            }
        });
    };
    RyokutyaCrawler.prototype.checkContent = function (content) {
        var data = content.match(/(進撃|巨人)/g);
        return (data == null) ? false : true;
    };
    return RyokutyaCrawler;
}());
exports.Ryokutya = new RyokutyaCrawler();
