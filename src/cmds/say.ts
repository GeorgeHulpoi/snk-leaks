export function say(bot: any, message: any, ...params: any[]): void
{
    let content = message.content;
    const channel = message.channel.id;
    message.delete();

    content = content.substring(5, content.length);
    bot.Client.channels.get(channel).send(content);
}