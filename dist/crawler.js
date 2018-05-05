"use strict";
exports.__esModule = true;
var Crawlers = require("./crawlers/index");
var Crawler = (function () {
    function Crawler(Bot, Client) {
        var _this = this;
        this.Bot = Bot;
        this.Client = Client;
        this.Interval = 5;
        this.Stopped = true;
        this.List = [];
        Object.keys(Crawlers).forEach(function (key) {
            if (key !== "__esModule") {
                _this.List.push(Crawlers[key]);
            }
        });
    }
    Crawler.prototype.Crawl = function (iterate) {
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
    Crawler.prototype.itStarted = function () {
        return (!this.Stopped);
    };
    Crawler.prototype.Start = function () {
        this.Stopped = false;
        this.Crawl();
    };
    Crawler.prototype.Stop = function () {
        this.Stopped = true;
        Object.keys(Crawlers).forEach(function (key) {
            if (key !== "__esModule") {
                Crawlers[key].reset();
            }
        });
    };
    Crawler.prototype.Interceptor = function (response) {
        if (typeof response !== "undefined") {
            this.Client.channels.get(this.Bot.ChannelID).send(this.FormatMessage(response));
        }
    };
    Crawler.prototype.FormatMessage = function (data) {
        return '**' + data.message + '** (' + data.link + ')';
    };
    return Crawler;
}());
exports.Crawler = Crawler;
