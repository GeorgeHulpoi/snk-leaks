export function setCrawlerInterval(bot: any, message: any, time: string): void
{
    const value = Number(time);

    if (value <= 0)
    {
        message.reply('Invalid value!');
        return;
    }

    bot.Crawler.Interval = value;

    message.reply('I set the interval at **' + value + 's**.');
}