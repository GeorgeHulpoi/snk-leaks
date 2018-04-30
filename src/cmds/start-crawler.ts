export function startCrawler(bot: any, message: any): void
{
    if (bot.Crawler.itStarted())
    {
        message.reply('The crawler it\'s already running.');
        return;                   
    }

    message.reply('Started the crawler.');
    bot.ChannelID = message.channel.id;
    bot.Crawler.Start();
}