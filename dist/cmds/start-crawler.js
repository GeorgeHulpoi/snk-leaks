"use strict";
exports.__esModule = true;
var crawler_1 = require("../crawler");
var bot_1 = require("../bot");
var client_1 = require("../client");
function startCrawler(message) {
    if (crawler_1.Crawler.itStarted()) {
        client_1.Client.reply(message, '**The crawler it\'s already running**');
        return;
    }
    client_1.Client.reply(message, '**The crawler started!**');
    bot_1.Bot.ChannelID = message.channel.id;
    crawler_1.Crawler.Start();
}
exports.startCrawler = startCrawler;
