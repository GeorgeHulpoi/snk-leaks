"use strict";
exports.__esModule = true;
var Crawlers_1 = require("../Crawlers");
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
    Crawlers_1.Crawlers.Interval = value;
    client_1.Client.reply(message, 'I put the interval at **' + value + 's**.');
}
exports.setCrawlerInterval = setCrawlerInterval;
