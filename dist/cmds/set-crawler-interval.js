"use strict";
exports.__esModule = true;
function setCrawlerInterval(bot, message, time) {
    var value = Number(time);
    if (typeof time === "undefined") {
        message.reply('**[USE]:** !set-crawler-interval **[number value]**');
        return;
    }
    else if (value <= 0) {
        message.reply('Invalid value!');
        return;
    }
    bot.Crawler.Interval = value;
    message.reply('I set the interval at **' + value + 's**.');
}
exports.setCrawlerInterval = setCrawlerInterval;
