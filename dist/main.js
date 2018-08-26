"use strict";
exports.__esModule = true;
var bot_1 = require("./bot");
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});
bot_1.Bot.start();
