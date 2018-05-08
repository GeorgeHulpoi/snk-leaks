"use strict";
exports.__esModule = true;
var crawler_1 = require("../crawler");
var client_1 = require("../client");
function setCrawlerInterval(message, time) {
    var value = Number(time);
    if (typeof time === "undefined") {
        client_1.Client.reply(message, '**[USE]:** !set-crawler-interval **[number value]**');
        return;
    }
    else if (value <= 0) {
        client_1.Client.reply(message, '**Invalid value!**');
        return;
    }
    crawler_1.Crawler.Interval = value;
    client_1.Client.reply(message, 'I put the interval at **' + value + 's**.');
}
exports.setCrawlerInterval = setCrawlerInterval;
