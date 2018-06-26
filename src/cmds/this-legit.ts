import { Bot } from "../bot";
import { Client } from "../client";

export function thisLegit(message: any): void
{
    Bot.LegitChannelID = message.channel.id;
    Client.reply(message, '**Okay**');
}