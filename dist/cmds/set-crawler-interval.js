"use strict";
exports.__esModule = true;
function setCrawlerInterval(bot, message, time) {
    var value = Number(time);
    if (value <= 0) {
        message.reply('Invalid value!');
        return;
    }
    bot.Crawler.Interval = value;
    message.reply('I set the interval at **' + value + 's**.');
}
exports.setCrawlerInterval = setCrawlerInterval;
