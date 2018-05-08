"use strict";
exports.__esModule = true;
var crawler_1 = require("../crawler");
var client_1 = require("../client");
function stopCrawler(message) {
    if (!crawler_1.Crawler.itStarted()) {
        client_1.Client.reply(message, '**Start the crawler first time!**');
        return;
    }
    client_1.Client.reply(message, '**The crawler stopped!**');
    crawler_1.Crawler.Stop();
}
exports.stopCrawler = stopCrawler;
