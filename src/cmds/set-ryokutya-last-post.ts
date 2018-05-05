import { Ryokutya } from '../crawlers/Ryokutya';

export function setRyokutyaLastPost(bot: any, message: any, time: string): void
{
    const value = Number(time);

    if (typeof time === "undefined")
    {
        message.reply('**[USE]:** !set-ryokutya-last-post **[number value]**');
        return;
    }
    else if (value < 0)
    {
        message.reply('Invalid value!');
        return;
    }

    Ryokutya.lastArticle = value;

    message.reply('**Ryokutya crawler** have now last article **' + value + '**.');
}