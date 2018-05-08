import { Baidu } from '../crawlers/Baidu';
import { Client } from "../client";

export function banBaiduThread(message: any, thread: string): void
{
    const value = Number(thread);

    if (typeof thread === "undefined")
    {
        Client.reply(message, '**[USE]:** !ban-baidu-thread **[thread id]**');
        return;
    }
    else if (value <= 0)
    {
        Client.reply(message, '**Invalid value!**');
        return;
    }

    if (Baidu.List.indexOf(value) == -1)
    {
        Baidu.List.push(value);
    }

    Client.reply(message, '**Baidu crawler** has now the article **' + value + '** banned.');
}