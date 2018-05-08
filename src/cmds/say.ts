import { Client } from "../client";

export function say(message: any, ...params: any[]): void
{
    let content = message.content;
    const channel = message.channel.id;
    message.delete();

    content = content.substring(5, content.length);
    Client.channels.get(channel).send(content);
}