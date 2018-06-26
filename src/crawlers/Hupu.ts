import { Crawler } from "../crawler";
import { Download } from '../download';

class HupuCrawler implements Crawler
{
    public List: number[] = [];
    private firstRun: boolean = true;

    constructor()
    {

    }

    public reset(): void 
    {
        this.List = [];
    }

    public crawl(callback: CrawlerResponseCallback): void 
    {
        console.log('Hupu ran at ' + (new Date()).toLocaleTimeString());
        this.check(callback);
    }

    /**
     * Check if are some new and publish it
     * 
     * @private
     * @param {CrawlerResponseCallback} callback 
     * @memberof HupuCrawler
     */
    private check(callback: CrawlerResponseCallback): void 
    {
        this.getThreads
        (
            (list?: number[]) => 
            {
                if (typeof list !== "undefined")
                {
                    const len = list.length;

                    if (this.firstRun)
                    {
                        for (let i = 0; i < len; ++i)
                        {
                            this.List.push(list[i]);
                        }
                        this.firstRun = false;
                    }
                    else 
                    {
                        for (let i = 0; i < len; ++i)
                        {
                            this.List.push(list[i]);
        
                            // Dayum.. I don't like to write codes like this!!
                            Crawler.Interceptor
                            (
                                {
                                    message: 'Hupu new thread',
                                    link: 'https://bbs.hupu.com/' + list[i] + '.html'
                                }
                            );
                        }
                    }
                }

                callback();
            }
        );
    }

    /**
     * Get all new articles related to SNK
     * 
     * @private
     * @param {(list?: number[]) => void} callback 
     * @memberof HupuCrawler
     */
    private getThreads(callback: (list?: number[]) => void): void
    {
        Download('https://bbs.hupu.com/acg', (error: any, response: any, body: string) =>
        {
            let List: number[] = [];

            // Checking if we have errors
            if (error != null)
            {
                console.log('Error in Hupu crawler at Download function.');
                console.log(error);
                callback();
                return;
            }

            let HTMLContent: string = body;

            const data = HTMLContent.match(/<div\s*class="bbs-content"\s*>.*?<\/div>\s*<div\s*class="bottom_tools"\s*>/g);
   
            // No new chapter
            if (data == null)
            {
                console.log('Hupu crawler it\'s outdated!');
                callback();
                return;
            }

            HTMLContent = data[0];

            // Get every article
            let Article: any;
            while ((Article = (/<a[^<>]*?class="truetit"[^<>]*?>.*?<\/a>/g).exec(HTMLContent)) != null) 
            {
                HTMLContent = HTMLContent.replace(Article[0], "");

                const name = (/<a[^<>]*?>(.*?)<\/a>/g).exec(Article[0])[1];
                const id =  Number(((/href="\/([0-9]*).html"/g).exec(Article[0]))[1]);

                if (this.checkContent(name))
                {
                    if (this.List.indexOf(id) == -1)
                    {
                        List.push(id);
                    }
                }
            }

            callback(List);
        });
    }

    /**
     * Searching for some words...
     * 
     * @private
     * @param {string} content 
     * @returns {boolean} 
     * @memberof HupuCrawler
     */
    private checkContent(content: string): boolean 
    {
        const data = content.match(/(進撃|巨人|106)/g);
        return (data == null) ? false : true;
    } 
}
export const Hupu: HupuCrawler = new HupuCrawler();