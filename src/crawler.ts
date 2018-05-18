import * as Crawlers from "./crawlers";
import { Client } from "./client";
import { Bot } from "./bot";

class CrawlerClass
{
    public Interval: number = 5;
    private Stopped: boolean = true;
    private List: Crawler[] = [];

    constructor()
    {
        Object.keys(Crawlers).forEach
        (
            (key: string) => 
            {
                if (key !== "__esModule") 
                {
                    this.List.push(Crawlers[key]);
                }
            }
        );
    }

    private Crawl(iterate: number = 0): void 
    {
        if(this.Stopped)
        {
            return;
        }

        if (typeof this.List[iterate] === "undefined")
        {
            // We consumed all crawlers, let's take a pause
            setTimeout
            (
                () => 
                {
                    this.Crawl();
                },
                this.Interval * 1000
            );

            return;
        }

        this.List[iterate].crawl
        (
            (response: any) => 
            {
                this.Interceptor(response);
                this.Crawl(iterate + 1);
            }
        );
    }

    /**
     * Verify if the crawler started
     * 
     * @returns {boolean} 
     * @memberof Crawler
     */
    public itStarted(): boolean 
    {
        return (!this.Stopped);
    }

    /**
     * Start the crawler
     * 
     * @memberof Crawler
     */
    public Start(): void 
    {
        this.Stopped = false;
        this.Crawl();
    }

    /**
     * Stop the crawler
     * 
     * @memberof Crawler
     */
    public Stop(): void 
    {
        this.Stopped = true;
        Object.keys(Crawlers).forEach
        (
            (key: string) => 
            {
                if (key !== "__esModule") 
                {
                    Crawlers[key].reset();
                }
            }
        );
    }
    /**
     * This function will be called at all HTTP request
     * Here we will send the message on Discord
     * 
     * @memberof Crawler
     */
    public Interceptor(response?: CrawlerResponse): void 
    {
        if (typeof response !== "undefined" && this.itStarted())
        {
            Client.send(Bot.ChannelID, this.FormatMessage(response), response.img);
        }
    }

    private FormatMessage(data: CrawlerResponse): string
    {
        return '**' + data.message + '** (' + data.link + ')';
    }  
}

export const Crawler = new CrawlerClass();