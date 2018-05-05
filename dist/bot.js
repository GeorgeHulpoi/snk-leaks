"use strict";
exports.__esModule = true;
var Discord = require('discord.js');
var Config = require('../Config.json');
var crawler_1 = require("./crawler");
var Cmds = require("./cmds");
var Bot = (function () {
    function Bot() {
        var _this = this;
        this.CrawlerInterval = 5;
        this.Ready = function (evt) {
            _this.Client.user.setActivity('with Sasha potato');
            console.log('Started!');
        };
        this.Disconnect = function (error, code) {
            console.log('Bot disconnected!');
            console.log('Error ' + error + ', code: ' + code);
            _this.Crawler.Stop();
        };
        this.Message = function (message) {
            var allowedRole = message.guild.roles.find("name", "Admin");
            if (message.member.roles.has(allowedRole.id)) {
                if (message.content[0] == "!") {
                    var params = message.content.split(' ');
                    var originalCmd = params[0];
                    var cmd = _this.transformCmd(params[0]);
                    params.splice(0, 1);
                    if (typeof Cmds[cmd] === "function") {
                        Cmds[cmd].apply(Cmds, [_this, message].concat(params));
                    }
                    else {
                        message.reply('Command \'**' + originalCmd + '**\' doesn\'t exist');
                    }
                }
                return;
            }
        };
        this.Client = new Discord.Client({
            autoReconnect: true
        });
        this.Client.login(Config.token);
        this.Crawler = new crawler_1.Crawler(this, this.Client);
        this.Events();
    }
    Bot.prototype.Events = function () {
        this.Client.on('ready', this.Ready);
        this.Client.on('message', this.Message);
        this.Client.on('disconnect', this.Disconnect);
    };
    Bot.prototype.transformCmd = function (cmd) {
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
    return Bot;
}());
exports.Bot = Bot;
