"use strict";
exports.__esModule = true;
function stopCrawler(bot, message) {
    if (!bot.Crawler.itStarted()) {
        message.reply('Start the crawler first.');
        return;
    }
    message.reply('Stop the crawler.');
    bot.Crawler.Stop();
}
exports.stopCrawler = stopCrawler;
