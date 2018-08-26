"use strict";
exports.__esModule = true;
var Crwls = require("./crawlers/index");
var client_1 = require("./client");
var bot_1 = require("./bot");
var Reddit_1 = require("./Reddit");
var CrawlersClass = (function () {
    function CrawlersClass() {
        var _this = this;
        this.QueueHead = null;
        this.Interval = 1;
        Object.keys(Crwls).forEach(function (key) {
            if (key !== "__esModule") {
                _this.QueueHead = new CrawlerQueue(Crwls[key], _this.QueueHead);
            }
        });
    }
    CrawlersClass.prototype.start = function (queue) {
        var _this = this;
        if (queue == null) {
            setTimeout(function () {
                _this.start(_this.QueueHead);
            }, this.Interval * 1000);
            return;
        }
        queue.crawler.start(function (response) {
            _this.Interceptor(response);
            _this.start(queue.next);
        });
    };
    CrawlersClass.prototype.Interceptor = function (data) {
        var len = data.length;
        for (var i = 0; i < len; ++i) {
            if (data[i].legit === true) {
                client_1.Client.send(bot_1.Bot.LegitChannelID, this.FormatMessage(data[i]));
            }
            else {
                client_1.Client.send(bot_1.Bot.PossibleChannelID, this.FormatMessage(data[i]));
            }
            Reddit_1.Reddit.comment(this.PRMT, this.FormatMessage(data[i]));
        }
    };
    CrawlersClass.prototype.FormatMessage = function (data) {
        return '@everyone **' + data.message + '** (' + data.link + ')';
    };
    CrawlersClass.prototype.resetCrawlers = function (crawler) {
        if (crawler == null) {
            return;
        }
        crawler.crawler.reset();
        this.resetCrawlers(crawler.next);
    };
    return CrawlersClass;
}());
var CrawlerQueue = (function () {
    function CrawlerQueue(crawler, next) {
        this.crawler = crawler;
        this.next = next;
    }
    return CrawlerQueue;
}());
exports.Crawlers = new CrawlersClass;
