"use strict";
exports.__esModule = true;
var Hupu_1 = require("../crawlers/Hupu");
var client_1 = require("../client");
function banHupuThread(message, thread) {
    var value = Number(thread);
    if (typeof thread === "undefined") {
        client_1.Client.reply(message, '**[USE]:** !ban-hupu-thread **[thread id]**');
        return;
    }
    else if (value <= 0) {
        client_1.Client.reply(message, '**Invalid value!**');
        return;
    }
    if (Hupu_1.Hupu.List.indexOf(value) == -1) {
        Hupu_1.Hupu.List.push(value);
    }
    client_1.Client.reply(message, '**Hupu crawler** has now the article **' + value + '** banned.');
}
exports.banHupuThread = banHupuThread;
