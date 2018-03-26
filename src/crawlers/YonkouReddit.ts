const HTTPS = require('https');
import { crawl, CrawlerResponse } from "../crawler";

class YonkouRedditCrawler implements crawl
{
    private lastComment: string;
    private First: boolean = true;

    constructor()
    {
 
    }

    /**
     * This function will be called by Crawler at x seconds.
     * 
     * @param {((response: CrawlerResponse | null) => void)} callback 
     * @memberof YonkouCrawler
     */
    public crawl(callback: (response: CrawlerResponse | null) => void): void 
    {
        // Get the first page of comments, we don't need all
        // Because this will work at 5-60 seconds interval, we don't lose anything in this time.
        this.getComments
        (
            (Comments: any) => 
            {
                const length = Comments.length;
                let response = null;

                for (let i = 0; i < length; ++i)
                {
                    // Check if we reached the last comment posted, to stop the for.
                    if (this.lastComment === Comments[i].data.id)
                    {
                        break;       
                    }

                    // We don't care others subs.. sorry.
                    if (Comments[i].data.subreddit === "ShingekiNoKyojin")
                    {
                        // Found something new
                        response = 
                        {
                            message: '**Possibily leak:** ' + Comments[i].data.body,
                            link: 'https://www.reddit.com' + Comments[i].data.permalink
                        };

                        this.lastComment = Comments[i].data.id;
                        break;
                    }
                }

                // This function must callback, if not the crawler will stop.
                callback(response);
            }
        );
    }

    /**
     * Get the first page comments
     * 
     * @private
     * @param {(response: any) => void} callback 
     * @memberof YonkouCrawler
     */
    private getComments(callback: (response: any) => void): void 
    {
        HTTPS.get
        (
            'https://www.reddit.com/user/YonkouProductions/comments/.json',
            (Response: any) => 
            {
                Response.setEncoding('utf8');
                let Content: string = "";

                Response.on
                (
                    'data',
                    (buffer: any) => 
                    {
                        Content += buffer;
                    }
                );

                Response.on
                (
                    'end',
                    () => 
                    {
                        let Obj = JSON.parse(Content);
                        Obj = Obj.data.children;

                        callback(Obj);
                    }
                );
            }
        );
    }
}

export let YonkouReddit = new YonkouRedditCrawler();