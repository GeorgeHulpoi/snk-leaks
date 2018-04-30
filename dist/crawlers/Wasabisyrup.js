"use strict";
exports.__esModule = true;
var HTTP = require('http');
var URL = require('url');
var WasabisyrupCrawler = (function () {
    function WasabisyrupCrawler() {
        this.lastArticle = 0;
    }
    WasabisyrupCrawler.prototype.reset = function () {
        this.lastArticle = 0;
    };
    WasabisyrupCrawler.prototype.crawl = function (callback) {
        this.getArticles(callback);
    };
    WasabisyrupCrawler.prototype.getArticles = function (callback) {
        var _this = this;
        var Request = URL.parse('http://ryokutya2089.com');
        var header = {};
        header['User-Agent'] = 'Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36';
        var Config = {
            host: Request.hostname,
            port: Request.port || 80,
            path: Request.pathname,
            headers: header,
            method: 'GET'
        };
        HTTP.get(Config, function (response) {
            response.setEncoding('utf8');
            var HTMLContent = '';
            response.on('data', function (buffer) {
                HTMLContent += buffer.toString('utf8');
            });
            response.on('end', function () {
                HTMLContent = HTMLContent.replace(/(\r\n\t|\n|\r\t)/gm, "");
                var data = HTMLContent.match(/<div\s*id="primary"\s*class="site-content">.*?<\/div><!--\s*#primary\s*-->/g);
                HTMLContent = data[0];
                HTMLContent = HTMLContent.replace(/<script[^<>]*?>[^<>]*?<\/script>/g, "");
                HTMLContent = HTMLContent.replace(/<article[^<>]*?class="[^"]*?post-96[^"]*?"[^<>]*?>.*?<\/article><!-- #post -->/g, "");
                var found = false;
                var Article;
                while ((Article = (/<article[^<>]*?id="post-(\d*)"[^<>]*?>/g).exec(HTMLContent)) != null) {
                    HTMLContent = HTMLContent.replace(Article[0], "");
                    if (Article[1] > _this.lastArticle) {
                        found = true;
                        _this.lastArticle = Article[1];
                        _this.checkArticle(_this.lastArticle, callback);
                        break;
                    }
                }
                if (!found) {
                    callback();
                }
            });
        });
    };
    WasabisyrupCrawler.prototype.checkArticle = function (id, callback) {
        var _this = this;
        var Request = URL.parse('http://ryokutya2089.com/archives/' + id);
        var header = {};
        header['User-Agent'] = 'Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36';
        var Config = {
            host: Request.hostname,
            port: Request.port || 80,
            path: Request.pathname,
            headers: header,
            method: 'GET'
        };
        HTTP.get(Config, function (response) {
            response.setEncoding('utf8');
            var HTMLContent = '';
            response.on('data', function (buffer) {
                HTMLContent += buffer.toString('utf8');
            });
            response.on('end', function () {
                HTMLContent = HTMLContent.replace(/(\r\n\t|\n|\r\t)/gm, "");
                var data = HTMLContent.match(/<article\s*id="post-[0-9]*"\s*class="[^"]*?">.*?<\/article>/g);
                HTMLContent = data[0];
                if (_this.checkContent(HTMLContent)) {
                    callback({
                        message: 'Found a possibly leak.',
                        link: 'http://ryokutya2089.com/archives/' + id
                    });
                }
                else {
                    callback();
                }
            });
        });
    };
    WasabisyrupCrawler.prototype.checkContent = function (content) {
        var data = content.match(/(進撃|巨人)/g);
        return (data == null) ? false : true;
    };
    return WasabisyrupCrawler;
}());
exports.Wasabisyrup = new WasabisyrupCrawler();
