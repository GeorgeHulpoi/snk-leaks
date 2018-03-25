const Discord = require('discord.io');
const Config = require('../Config.json');
import { Crawler } from "./crawler";

export class Bot
{
    private Discord: any;
    private Crawler: Crawler;
    public ChannelID: number;
    private CrawlerInterval: number = 60; // In seconds

    constructor()
    {
        this.Discord = new Discord.Client
        (
            {
                token: Config.token,
                autorun: true
            }
        );

        this.Crawler = new Crawler(this, this.Discord);
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
        this.Discord.on('ready', this.Ready);
        this.Discord.on('message', this.Message);
        this.Discord.on('disconnect', this.Disconnect);
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
     * Event called when somebody text on channel
     * 
     * @private
     * @memberof Bot
     */
    // TODO: Move all of these in functions
    private Message = (userName: string, userId: number, channelId: number, message: string, evt: any) => 
    {
        if (message[0] === "!")
        {
            if (message === "!set-channel")
            {
                this.ChannelID = channelId;

                this.Discord.sendMessage
                (
                    {
                        to: channelId,
                        message: 'Channel set!'
                    }
                );

                return;
            }
            else if (message === "!start-crawler")
            {
                if (!this.ChannelID)
                {
                    this.Discord.sendMessage
                    (
                        {
                            to: channelId,
                            message: 'Set the channel first!'
                        }
                    );    
                    
                    return;
                }
                else if(this.Crawler.itStarted())
                {
                    this.Discord.sendMessage
                    (
                        {
                            to: channelId,
                            message: 'The crawler it\'s already running'
                        }
                    );    
                    
                    return;                   
                }
                
                this.Discord.sendMessage
                (
                    {
                        to: channelId,
                        message: 'Started the crawler.'
                    }
                );

                this.Crawler.Start();
            }
            else if (message === "!stop-crawler")
            {
                if (!this.Crawler.itStarted())
                {
                    this.Discord.sendMessage
                    (
                        {
                            to: channelId,
                            message: 'Start the crawler first!'
                        }
                    );    
                    
                    return;
                }

                this.Discord.sendMessage
                (
                    {
                        to: channelId,
                        message: 'Stopped the crawler.'
                    }
                );             

                this.Crawler.Stop();
            }           

            let params = message.split(" ");

            if (params[0] === "!set-crawler-interval")
            {
                const value = Number(params[1]);

                if (value <= 0)
                {
                    this.Discord.sendMessage
                    (
                        {
                            to: channelId,
                            message: 'Invalid value!'
                        }
                    );

                    return;
                }
                else if (this.Crawler.itStarted())
                {
                    this.Discord.sendMessage
                    (
                        {
                            to: channelId,
                            message: 'The crawler started already, stop it and try again.'
                        }
                    );

                    return;                 
                }

                this.Crawler.Interval = Number(params[1]);

                this.Discord.sendMessage
                (
                    {
                        to: channelId,
                        message: 'I set the interval at ' + this.Crawler.Interval + 's.'
                    }
                );

                return;
            }
        }
    };
}