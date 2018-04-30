export function stopCrawler(bot: any, message: any): void
{
    if (!bot.Crawler.itStarted())
    {
        message.reply('Start the crawler first.');
        return;                   
    }

    message.reply('Stop the crawler.');
    bot.Crawler.Stop();
}