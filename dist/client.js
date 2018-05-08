"use strict";
exports.__esModule = true;
var Discord = require('discord.js');
var Config = require('../Config.json');
exports.Client = new Discord.Client({
    autoReconnect: true
});
exports.Client.login(Config.token);
exports.Client.reply = function (message, content) {
    exports.Client.channels.get(message.channel.id).send(content);
};
exports.Client.send = function (channel, content) {
    exports.Client.channels.get(channel).send(content);
};
