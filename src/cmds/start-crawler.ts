import { Crawlers } from "../Crawlers";
import { Client } from "../client";

export function startCrawler(message: any): void
{
    /*if (Crawlers.itStarted())
    {
        Client.reply(message, '**The crawler it\'s already running**');
        return;                   
    }*/

    Client.reply(message, '**The crawler started!**');
    Crawlers.start();
}