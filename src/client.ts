const Discord = require('discord.js');
const Config = require('../config.json');

export let Client = new Discord.Client
({
    autoReconnect: true
});
Client.login(Config.token);

Client.reply = (message: any, content: string) =>
{
    Client.channels.get(message.channel.id).send(content);
}

Client.send = (channel: number, content: string, img?: string) =>
{
    if (typeof img === "undefined")
    {
        Client.channels.get(channel).send(content);
    }
    else 
    {
        Client.channels.get(channel).send(content, {file: img});
    }
}