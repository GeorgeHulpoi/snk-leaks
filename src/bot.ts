import { Client } from "./client";
import * as Cmds from "./cmds";

export class BotClass
{
    public PossibleChannelID: number;
    public LegitChannelID: number;

    public start(): void 
    {
        
    }

    constructor()
    {
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
        Client.on('ready', this.Ready);
        Client.on('message', this.Message);
        Client.on('disconnect', this.Disconnect);
    }

    /**
     * Event called when the bot is ready.
     * 
     * @private
     * @memberof Bot
     */
    private Ready = (evt: any) => 
    {
        Client.user.setActivity('with Sasha potato');
        console.clear();
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
        const cID: number = message.channel.id;
        if (message.content[0] == "!")
        {
            const allowedRole = message.guild.roles.find("name", "Communist Party Leader");
            if (message.member.roles.has(allowedRole.id))
            {
                let params = message.content.split(' ');
                const originalCmd = params[0];
                const cmd = this.transformCmd(params[0]);
                params.splice(0,1);
    
                if (typeof Cmds[cmd] === "function")
                {
                    Cmds[cmd](message, ...params);
                }
                else 
                {
                    message.reply('Command \'**' + originalCmd + '**\' doesn\'t exist');
                }
            }        
            return;
        }
        if (message.content.toLowerCase() == "ping")
        {
            Client.send(cID, 'pong');
        }
    }
}

export const Bot = new BotClass();
