import { Hupu } from '../crawlers/Hupu';
import { Client } from "../client";

export function banHupuThread(message: any, thread: string): void
{
    const value = Number(thread);

    if (typeof thread === "undefined")
    {
        Client.reply(message, '**[USE]:** !ban-hupu-thread **[thread id]**');
        return;
    }
    else if (value <= 0)
    {
        Client.reply(message, '**Invalid value!**');
        return;
    }

    if (Hupu.List.indexOf(value) == -1)
    {
        Hupu.List.push(value);
    }

    Client.reply(message, '**Hupu crawler** has now the article **' + value + '** banned.');
}