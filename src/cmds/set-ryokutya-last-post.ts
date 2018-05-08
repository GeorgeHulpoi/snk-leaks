import { Ryokutya } from "../crawlers/Ryokutya";
import { Client } from "../client";

export function setRyokutyaLastPost(message: any, time: string): void
{
    const value = Number(time);

    if (typeof time === "undefined")
    {
        Client.reply(message, '**[USE]:** !set-ryokutya-last-post **[number value]**');
        return;
    }
    else if (value < 0)
    {
        Client.reply(message, '**Invalid value!**');
        return;
    }

    Ryokutya.lastArticle = value;

    Client.reply(message, '**Ryokutya crawler** has now last article **' + value + '**.');
}