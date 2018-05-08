import { Crawler } from "../crawler";
import { Client } from "../client";

export function setCrawlerInterval(message: any, time: string): void
{
    const value = Number(time);

    if (typeof time === "undefined")
    {
        Client.reply(message, '**[USE]:** !set-crawler-interval **[number value]**');
        return;
    }
    else if (value <= 0)
    {
        Client.reply(message, '**Invalid value!**');
        return;
    }

    Crawler.Interval = value;

    Client.reply(message, 'I put the interval at **' + value + 's**.');
}