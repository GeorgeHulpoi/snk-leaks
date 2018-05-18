"use strict";
exports.__esModule = true;
var Crawlers = require("./crawlers");
var client_1 = require("./client");
var bot_1 = require("./bot");
var CrawlerClass = (function () {
    function CrawlerClass() {
        var _this = this;
        this.Interval = 5;
        this.Stopped = true;
        this.List = [];
        Object.keys(Crawlers).forEach(function (key) {
            if (key !== "__esModule") {
                _this.List.push(Crawlers[key]);
            }
        });
    }
    CrawlerClass.prototype.Crawl = function (iterate) {
        var _this = this;
        if (iterate === void 0) { iterate = 0; }
        if (this.Stopped) {
            return;
        }
        if (typeof this.List[iterate] === "undefined") {
            setTimeout(function () {
                _this.Crawl();
            }, this.Interval * 1000);
            return;
        }
        this.List[iterate].crawl(function (response) {
            _this.Interceptor(response);
            _this.Crawl(iterate + 1);
        });
    };
    CrawlerClass.prototype.itStarted = function () {
        return (!this.Stopped);
    };
    CrawlerClass.prototype.Start = function () {
        this.Stopped = false;
        this.Crawl();
    };
    CrawlerClass.prototype.Stop = function () {
        this.Stopped = true;
        Object.keys(Crawlers).forEach(function (key) {
            if (key !== "__esModule") {
                Crawlers[key].reset();
            }
        });
    };
    CrawlerClass.prototype.Interceptor = function (response) {
        if (typeof response !== "undefined" && this.itStarted()) {
            client_1.Client.send(bot_1.Bot.ChannelID, this.FormatMessage(response), response.img);
        }
    };
    CrawlerClass.prototype.FormatMessage = function (data) {
        return '**' + data.message + '** (' + data.link + ')';
    };
    return CrawlerClass;
}());
exports.Crawler = new CrawlerClass();
