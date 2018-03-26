"use strict";
exports.__esModule = true;
var HTTPS = require('https');
var YonkouRedditCrawler = (function () {
    function YonkouRedditCrawler() {
        this.First = true;
    }
    YonkouRedditCrawler.prototype.crawl = function (callback) {
        var _this = this;
        this.getComments(function (Comments) {
            var length = Comments.length;
            var response = null;
            for (var i = 0; i < length; ++i) {
                if (_this.lastComment === Comments[i].data.id) {
                    break;
                }
                if (Comments[i].data.subreddit === "ShingekiNoKyojin") {
                    response =
                        {
                            message: '**Possibily leak:** ' + Comments[i].data.body,
                            link: 'https://www.reddit.com' + Comments[i].data.permalink
                        };
                    _this.lastComment = Comments[i].data.id;
                    break;
                }
            }
            callback(response);
        });
    };
    YonkouRedditCrawler.prototype.getComments = function (callback) {
        HTTPS.get('https://www.reddit.com/user/YonkouProductions/comments/.json', function (Response) {
            Response.setEncoding('utf8');
            var Content = "";
            Response.on('data', function (buffer) {
                Content += buffer;
            });
            Response.on('end', function () {
                var Obj = JSON.parse(Content);
                Obj = Obj.data.children;
                callback(Obj);
            });
        });
    };
    return YonkouRedditCrawler;
}());
exports.YonkouReddit = new YonkouRedditCrawler();
