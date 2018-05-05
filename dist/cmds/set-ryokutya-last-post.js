"use strict";
exports.__esModule = true;
var Ryokutya_1 = require("../crawlers/Ryokutya");
function setRyokutyaLastPost(bot, message, time) {
    var value = Number(time);
    if (typeof time === "undefined") {
        message.reply('**[USE]:** !set-ryokutya-last-post **[number value]**');
        return;
    }
    else if (value < 0) {
        message.reply('Invalid value!');
        return;
    }
    Ryokutya_1.Ryokutya.lastArticle = value;
    message.reply('**Ryokutya crawler** have now last article **' + value + '**.');
}
exports.setRyokutyaLastPost = setRyokutyaLastPost;
