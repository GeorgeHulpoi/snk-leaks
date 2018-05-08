"use strict";
exports.__esModule = true;
var Baidu_1 = require("../crawlers/Baidu");
var client_1 = require("../client");
function banBaiduThread(message, thread) {
    var value = Number(thread);
    if (typeof thread === "undefined") {
        client_1.Client.reply(message, '**[USE]:** !ban-baidu-thread **[thread id]**');
        return;
    }
    else if (value <= 0) {
        client_1.Client.reply(message, '**Invalid value!**');
        return;
    }
    if (Baidu_1.Baidu.List.indexOf(value) == -1) {
        Baidu_1.Baidu.List.push(value);
    }
    client_1.Client.reply(message, '**Baidu crawler** has now the article **' + value + '** banned.');
}
exports.banBaiduThread = banBaiduThread;
