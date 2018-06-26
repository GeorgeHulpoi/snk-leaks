import { Bot } from "../bot";
import { Client } from "../client";

export function thisPossible(message: any): void
{
    Bot.PossibleChannelID = message.channel.id;
    Client.reply(message, '**Okay**');
}