import { Zekken } from "../crawlers/Zekken";
import { Client } from "../client";

export function setZekkenLastPost(message: any, time: string): void
{
    const value = Number(time);

    if (typeof time === "undefined")
    {
        Client.reply(message, '**[USE]:** !set-zekken-last-post **[number value]**');
        return;
    }
    else if (value < 0)
    {
        Client.reply(message, '**Invalid value!**');
        return;
    }

    Zekken.lastArticle = value;

    Client.reply(message, '**Zekken crawler** has now last article **' + value + '**.');
}