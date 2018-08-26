"use strict";
exports.__esModule = true;
var Crawlers_1 = require("../Crawlers");
var client_1 = require("../client");
function startCrawler(message) {
    client_1.Client.reply(message, '**The crawler started!**');
    Crawlers_1.Crawlers.start();
}
exports.startCrawler = startCrawler;
