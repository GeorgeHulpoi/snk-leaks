"use strict";
exports.__esModule = true;
var client_1 = require("./client");
var Cmds = require("./cmds");
var BotClass = (function () {
    function BotClass() {
        var _this = this;
        this.Ready = function (evt) {
            client_1.Client.user.setActivity('with Sasha potato');
            console.clear();
            console.log('Started!');
        };
        this.Disconnect = function (error, code) {
            console.log('Bot disconnected!');
            console.log('Error ' + error + ', code: ' + code);
        };
        this.Message = function (message) {
            var cID = message.channel.id;
            if (message.content[0] == "!") {
                var allowedRole = message.guild.roles.find("name", "Communist Party Leader");
                if (message.member.roles.has(allowedRole.id)) {
                    var params = message.content.split(' ');
                    var originalCmd = params[0];
                    var cmd = _this.transformCmd(params[0]);
                    params.splice(0, 1);
                    if (typeof Cmds[cmd] === "function") {
                        Cmds[cmd].apply(Cmds, [message].concat(params));
                    }
                    else {
                        message.reply('Command \'**' + originalCmd + '**\' doesn\'t exist');
                    }
                }
                return;
            }
            if (message.content.toLowerCase() == "ping") {
                client_1.Client.send(cID, 'pong');
            }
        };
        this.Events();
    }
    BotClass.prototype.start = function () {
    };
    BotClass.prototype.Events = function () {
        client_1.Client.on('ready', this.Ready);
        client_1.Client.on('message', this.Message);
        client_1.Client.on('disconnect', this.Disconnect);
    };
    BotClass.prototype.transformCmd = function (cmd) {
        var len = cmd.length;
        var command = (cmd.substring(1, len)).split('');
        for (var i = 0; i < len - 1; ++i) {
            if (command[i] == '-') {
                command.splice(i, 1);
                if (typeof command[i] !== "undefined") {
                    command[i] = command[i].toUpperCase();
                }
            }
        }
        return command.join('');
    };
    return BotClass;
}());
exports.BotClass = BotClass;
exports.Bot = new BotClass();
