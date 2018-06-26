import { Crawler } from "../crawler";
import { Client } from "../client";

export function startCrawler(message: any): void
{
    if (Crawler.itStarted())
    {
        Client.reply(message, '**The crawler it\'s already running**');
        return;                   
    }

    Client.reply(message, '**The crawler started!**');
    Crawler.Start();
}