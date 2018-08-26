import { Crawlers } from "../Crawlers";
import { Client } from "../client";

export function setPrmt(message: any, id: string): void
{
    if (typeof id === "undefined")
    {
        Client.reply(message, '**[USE]:** !set-prmt **[id]**');
        return;
    }

    Crawlers.PRMT = id;

    Client.reply(message, '**Done.**');
}