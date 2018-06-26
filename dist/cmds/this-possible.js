"use strict";
exports.__esModule = true;
var bot_1 = require("../bot");
var client_1 = require("../client");
function thisPossible(message) {
    bot_1.Bot.PossibleChannelID = message.channel.id;
    client_1.Client.reply(message, '**Okay**');
}
exports.thisPossible = thisPossible;
