import { Crawler } from "../crawler";
import { Client } from "../client";

export function stopCrawler(message: any): void
{
    if (!Crawler.itStarted())
    {
        Client.reply(message, '**Start the crawler first time!**');
        return;                   
    }

    Client.reply(message, '**The crawler stopped!**');
    Crawler.Stop();
}