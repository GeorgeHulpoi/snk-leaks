import { Reddit } from "../Reddit";
import { Client } from "../client";

export async function redditRequestToken(message: any, code: string): Promise<void>
{
    if (typeof code === "undefined")
    {
        Client.reply(message, '**[USE]:** !reddit-request-code **[code]**');
        return;
    }

    const response: string = await Reddit.request_token(code);

    Client.reply(message, '**' + response + '**.');
}