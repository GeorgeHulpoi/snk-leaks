"use strict";
exports.__esModule = true;
var client_1 = require("../client");
function say(message) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    var content = message.content;
    var channel = message.channel.id;
    message["delete"]();
    content = content.substring(5, content.length);
    client_1.Client.channels.get(channel).send(content);
}
exports.say = say;
