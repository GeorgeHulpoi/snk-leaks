"use strict";
exports.__esModule = true;
function say(bot, message) {
    var params = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        params[_i - 2] = arguments[_i];
    }
    var content = message.content;
    var channel = message.channel.id;
    message["delete"]();
    content = content.substring(5, content.length);
    bot.Client.channels.get(channel).send(content);
}
exports.say = say;
