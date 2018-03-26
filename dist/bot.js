"use strict";
exports.__esModule = true;
var Discord = require('discord.io');
var Config = require('../Config.json');
var crawler_1 = require("./crawler");
var Bot = (function () {
    function Bot() {
        var _this = this;
        this.CrawlerInterval = 5;
        this.Ready = function (evt) {
            console.log('Started!');
        };
        this.Disconnect = function (error, code) {
            console.log('Bot disconnected!');
            console.log('Error ' + error + ', code: ' + code);
            _this.Crawler.Stop();
        };
        this.Message = function (userName, userId, channelId, message, evt) {
            if (message[0] === "!") {
                if (message === "!start-crawler") {
                    if (_this.Crawler.itStarted()) {
                        _this.Discord.sendMessage({
                            to: channelId,
                            message: '**The crawler it\'s already running**'
                        });
                        return;
                    }
                    _this.ChannelID = channelId;
                    _this.Discord.sendMessage({
                        to: channelId,
                        message: '**Started the crawler.**'
                    });
                    _this.Crawler.Start();
                }
                else if (message === "!stop-crawler") {
                    if (!_this.Crawler.itStarted()) {
                        _this.Discord.sendMessage({
                            to: channelId,
                            message: '**Start the crawler first!**'
                        });
                        return;
                    }
                    _this.Discord.sendMessage({
                        to: channelId,
                        message: '**I stop the crawler.**'
                    });
                    _this.Crawler.Stop();
                }
                var params = message.split(" ");
                if (params[0] === "!set-crawler-interval") {
                    var value = Number(params[1]);
                    if (value <= 0) {
                        _this.Discord.sendMessage({
                            to: channelId,
                            message: '**Invalid value!**'
                        });
                        return;
                    }
                    _this.Crawler.Interval = Number(params[1]);
                    _this.Discord.sendMessage({
                        to: channelId,
                        message: '**I set the interval at ' + _this.Crawler.Interval + 's.**'
                    });
                    return;
                }
            }
        };
        this.Discord = new Discord.Client({
            token: Config.token,
            autorun: true
        });
        this.Crawler = new crawler_1.Crawler(this, this.Discord);
        this.Events();
    }
    Bot.prototype.Events = function () {
        this.Discord.on('ready', this.Ready);
        this.Discord.on('message', this.Message);
        this.Discord.on('disconnect', this.Disconnect);
    };
    return Bot;
}());
exports.Bot = Bot;
