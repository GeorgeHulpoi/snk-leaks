"use strict";
exports.__esModule = true;
var crawler_1 = require("./crawler");
var client_1 = require("./client");
var Cmds = require("./cmds");
var BotClass = (function () {
    function BotClass() {
        var _this = this;
        this.CrawlerInterval = 5;
        this.Ready = function (evt) {
            client_1.Client.user.setActivity('with Sasha potato');
            console.clear();
            console.log('Started!');
        };
        this.Disconnect = function (error, code) {
            console.log('Bot disconnected!');
            console.log('Error ' + error + ', code: ' + code);
            crawler_1.Crawler.Stop();
        };
        this.Message = function (message) {
            var cID = message.channel.id;
            if (message.content[0] == "!") {
                var allowedRole = message.guild.roles.find("name", "r00t");
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
            if (message.content.toLowerCase() == "leaks when?" || message.content.toLowerCase() == "leaks when") {
                client_1.Client.send(cID, 'never');
            }
            else if (message.content.toLowerCase() == "leaks") {
                client_1.Client.send(cID, '', 'https://www.cookforyourlife.org/wp-content/uploads/2015/08/shutterstock_234785131-min.jpg');
            }
            else if (message.content.toLowerCase() == "sasha") {
                client_1.Client.send(cID, 'best gurl', 'http://i0.kym-cdn.com/entries/icons/original/000/018/963/Screenshot_159.png');
            }
            else if (message.content.toLowerCase() == "gabi") {
                client_1.Client.send(cID, 'DID NOTHING WRONG', 'https://cdn.discordapp.com/attachments/450324795981168640/452858852405411842/Gabi_prof.png');
            }
            else if (message.content.toLowerCase() == "cat") {
                client_1.Client.send(cID, 'meow', 'https://i.imgur.com/Y9ynHwx.gif');
            }
            else if (message.content.toLowerCase() == "historia") {
                client_1.Client.send(cID, 'I show my dick for the queen.');
            }
            else if (message.content.toLowerCase() == "armin") {
                client_1.Client.send(cID, '', 'https://cdn.discordapp.com/attachments/450324795981168640/453589843520258048/3DUC6tc.png');
            }
            else if (message.content.toLowerCase() == "party hard") {
                client_1.Client.send(cID, 'kill sasha hard', 'https://cdn.discordapp.com/attachments/450324795981168640/453572634370768897/image.png');
            }
            else if (message.content.toLowerCase() == "ereh") {
                client_1.Client.send(cID, 'come at me boi', 'https://i.imgur.com/YPPbDfl.jpg');
            }
            else if (message.content.toLowerCase() == "goal") {
                client_1.Client.send(cID, 'WINNER OF CHAMPIONS LEAGUE 2016', 'https://i.imgur.com/x3IstEG.jpg');
            }
            else if (message.content.toLowerCase() == "baseball") {
                client_1.Client.send(cID, '', 'https://i.imgur.com/2JD82zU.jpg');
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
