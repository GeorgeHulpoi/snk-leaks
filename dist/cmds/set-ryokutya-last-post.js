"use strict";
exports.__esModule = true;
var Ryokutya_1 = require("../crawlers/Ryokutya");
var client_1 = require("../client");
function setRyokutyaLastPost(message, time) {
    var value = Number(time);
    if (typeof time === "undefined") {
        client_1.Client.reply(message, '**[USE]:** !set-ryokutya-last-post **[number value]**');
        return;
    }
    else if (value < 0) {
        client_1.Client.reply(message, '**Invalid value!**');
        return;
    }
    Ryokutya_1.Ryokutya.lastArticle = value;
    client_1.Client.reply(message, '**Ryokutya crawler** has now last article **' + value + '**.');
}
exports.setRyokutyaLastPost = setRyokutyaLastPost;
