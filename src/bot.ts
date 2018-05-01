const Discord = require('discord.js');
const Config = require('../Config.json');
import { Crawler } from "./crawler";
import * as Cmds from "./cmds";

export class Bot
{
    private Client: any;
    public Crawler: Crawler;
    public ChannelID: number;
    private CrawlerInterval: number = 5; // In seconds

    constructor()
    {
        this.Client = new Discord.Client();
        this.Client.login(Config.token);
        this.Crawler = new Crawler(this, this.Client);
        this.Events();
    }

    /**
     * Catch discord events on this class
     * 
     * @private
     * @memberof Bot
     */
    private Events(): void 
    {
        this.Client.on('ready', this.Ready);
        this.Client.on('message', this.Message);
        this.Client.on('disconnect', this.Disconnect);
    }

    /**
     * Event called when the bot is ready.
     * 
     * @private
     * @memberof Bot
     */
    private Ready = (evt: any) => 
    {
        console.log('Started!');
    };

    /**
     * Event called when the bot is disconnected.
     * 
     * @private
     * @memberof Bot
     */
    private Disconnect = (error: string, code: number) =>
    {
        console.log('Bot disconnected!');
        console.log('Error ' + error + ', code: ' + code);

        this.Crawler.Stop();
    }

    /**
     * A function can't have the name like: some-name
     * So I will put the function someName and I will transform the command !some-name in someName
     * To call it dynamic
     * 
     * @private
     * @param {string} cmd 
     * @returns {string} 
     * @memberof Bot
     */
    private transformCmd(cmd: string): string 
    {
        const len = cmd.length;
        let command = (cmd.substring(1, len)).split('');

        for (let i = 0; i < len - 1; ++i)
        {
            if (command[i] == '-')
            {
                command.splice( i , 1);
                if (typeof command[i] !== "undefined")
                {
                    command[i] = command[i].toUpperCase();
                }    
            }
        }

        return command.join('');
    }

    /**
     * Event called when somebody text on channel
     * 
     * @private
     * @memberof Bot
     */
    private Message = (message: any) => 
    {
        const allowedRole = message.guild.roles.find("name", "Admin");
        if (message.member.roles.has(allowedRole.id))
        {
            if (message.content[0] == "!")
            {
                let params = message.content.split(' ');
                const originalCmd = params[0];
                const cmd = this.transformCmd(params[0]);
                params.splice(0,1);
    
                if (typeof Cmds[cmd] === "function")
                {
                    Cmds[cmd](this, message, ...params);
                }
                else 
                {
                    message.reply('Command \'**' + originalCmd + '**\' doesn\'t exist');
                }
            }           
            return;
        }
    }
}