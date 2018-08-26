"use strict";
exports.__esModule = true;
var Crawlers_1 = require("../Crawlers");
var client_1 = require("../client");
function setPrmt(message, id) {
    if (typeof id === "undefined") {
        client_1.Client.reply(message, '**[USE]:** !set-prmt **[id]**');
        return;
    }
    Crawlers_1.Crawlers.PRMT = id;
    client_1.Client.reply(message, '**Done.**');
}
exports.setPrmt = setPrmt;
