import { Reddit } from "../Reddit";
import { Client } from "../client";

export async function redditComment(message: any, fullname: string, ...params: string[]): Promise<void>
{
    const text: string = params.join(' ');

    if (fullname === '' ||  text === '')
    {
        Client.reply(message, '**[USE]:** !reddit-comment **[id] [text]**');
        return;
    }
    else 
    {
        const response: string = await Reddit.comment(fullname, text);

        Client.reply(message, '**Link of comment:** ' + response + '');
    }
}