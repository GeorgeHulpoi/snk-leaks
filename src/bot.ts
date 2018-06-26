import { Crawler } from "./crawler";
import { Client } from "./client";
import * as Cmds from "./cmds";

export class BotClass
{
    public PossibleChannelID: number;
    public LegitChannelID: number;
    private CrawlerInterval: number = 5; // In seconds

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

        Crawler.Stop();
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
            const allowedRole = message.guild.roles.find("name", "r00t");
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
        if (message.content.toLowerCase() == "leaks when?" || message.content.toLowerCase() == "leaks when")
        {
            Client.send(cID, 'never');
        }
        else if (message.content.toLowerCase() == "leaks")
        {
            Client.send(cID, '', 'https://www.cookforyourlife.org/wp-content/uploads/2015/08/shutterstock_234785131-min.jpg');
        }
        else if (message.content.toLowerCase() == "sasha")
        {
            Client.send(cID, 'best gurl', 'http://i0.kym-cdn.com/entries/icons/original/000/018/963/Screenshot_159.png');
        }
        else if (message.content.toLowerCase() == "gabi")
        {
            Client.send(cID, 'DID NOTHING WRONG', 'https://cdn.discordapp.com/attachments/450324795981168640/452858852405411842/Gabi_prof.png');
        }
        else if (message.content.toLowerCase() == "cat")
        {
            Client.send(cID, 'meow', 'https://i.imgur.com/Y9ynHwx.gif');
        }   
        else if (message.content.toLowerCase() == "historia")
        {
            Client.send(cID, 'I show my dick for the queen.');
        }  
        else if (message.content.toLowerCase() == "armin")
        {
            Client.send(cID, '', 'https://cdn.discordapp.com/attachments/450324795981168640/453589843520258048/3DUC6tc.png');
        }      
        else if (message.content.toLowerCase() == "party hard")
        {
            Client.send(cID, 'kill sasha hard', 'https://cdn.discordapp.com/attachments/450324795981168640/453572634370768897/image.png');
        }    
        else if (message.content.toLowerCase() == "ereh")
        {
            Client.send(cID, 'come at me boi', 'https://i.imgur.com/YPPbDfl.jpg');
        }         
        else if (message.content.toLowerCase() == "goal")
        {
            Client.send(cID, 'WINNER OF CHAMPIONS LEAGUE 2016', 'https://i.imgur.com/x3IstEG.jpg');
        }  
        else if (message.content.toLowerCase() == "baseball")
        {
            Client.send(cID, '', 'https://i.imgur.com/2JD82zU.jpg');
        } 
    }
}

export const Bot = new BotClass();