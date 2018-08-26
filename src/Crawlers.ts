import * as Crwls from "./crawlers/index";
import { Crawler } from "./crawlers/Crawler";
import { Client } from "./client";
import { Bot } from "./bot";
import { Reddit } from "./Reddit";

class CrawlersClass
{
    private QueueHead: CrawlerQueue = null;
    public PRMT: string;
    public Interval: number = 1; // In seconds

    constructor()
    {
        Object.keys(Crwls).forEach
        (
            (key: string) => 
            {
                if (key !== "__esModule") 
                {
                    this.QueueHead = new CrawlerQueue(Crwls[key], this.QueueHead);
                }
            }
        );
    }

    /**
     * Start the crawlers
     * @param  {CrawlerQueue} [queue] 
     * @return void 
     * @memberof CrawlersClass
     */
    public start(queue?: CrawlerQueue): void
    {
        if (queue == null)
        {
            setTimeout
            (
                () => 
                {
                    this.start(this.QueueHead);
                }, 
                this.Interval * 1000
            );  
            return;
        }

        queue.crawler.start
        (
            (response: CrawlerDataResponse[]) => 
            {
                this.Interceptor(response);
                this.start(queue.next);
            }
        );
    }


    /**
     * Callback for new data
     * @private
     * @param  {CrawlerDataResponse[]} data 
     * @return {void}@memberof CrawlersClass
     */
    private Interceptor(data: CrawlerDataResponse[])
    {
        const len = data.length;
        for (let i = 0; i < len; ++i)
        {
            if (data[i].legit === true)
            {
                Client.send(Bot.LegitChannelID, this.FormatMessage(data[i])); 
            }
            else 
            {
                Client.send(Bot.PossibleChannelID, this.FormatMessage(data[i])); 
            }

            Reddit.comment(this.PRMT, this.FormatMessage(data[i]));
        }
    }


    /**
     * Format message from response
     * @private
     * @param  {CrawlerResponse} data 
     * @return string 
     * @memberof CrawlersClass
     */
    private FormatMessage(data: CrawlerDataResponse): string
    {
        return '@everyone **' + data.message + '** (' + data.link + ')';
    }  

    private resetCrawlers(crawler: CrawlerQueue): void 
    {
        if (crawler == null)
        {
            return;
        }

        crawler.crawler.reset();
        this.resetCrawlers(crawler.next);
    }
}

class CrawlerQueue
{
    public crawler: Crawler;
    public next: CrawlerQueue;

    constructor(crawler: any, next?: CrawlerQueue)
    {
        this.crawler = crawler;
        this.next = next;
    }
}

export const Crawlers = new CrawlersClass;