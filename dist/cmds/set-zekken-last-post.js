"use strict";
exports.__esModule = true;
var Zekken_1 = require("../crawlers/Zekken");
var client_1 = require("../client");
function setZekkenLastPost(message, time) {
    var value = Number(time);
    if (typeof time === "undefined") {
        client_1.Client.reply(message, '**[USE]:** !set-zekken-last-post **[number value]**');
        return;
    }
    else if (value < 0) {
        client_1.Client.reply(message, '**Invalid value!**');
        return;
    }
    Zekken_1.Zekken.lastArticle = value;
    client_1.Client.reply(message, '**Zekken crawler** has now last article **' + value + '**.');
}
exports.setZekkenLastPost = setZekkenLastPost;
