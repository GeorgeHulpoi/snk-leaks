import { Reddit } from "../Reddit";
import { Client } from "../client";

export async function redditRefreshToken(message: any, fullname: string, ...params: string[]): Promise<void>
{
    const response: boolean = await Reddit.refresh_token();

    if (response)
    {
        Client.reply(message, '**I got the new token.**');
    } 
    else 
    {
        Client.reply(message, '**Something went wrong.**');
    }
}