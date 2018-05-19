import { Download } from '../download';

class MaruMaruCrawler implements Crawler
{
    private published: boolean = false;

    constructor()
    {

    }

    public reset(): void 
    {
        this.published = false;
    }

    public crawl(callback: CrawlerResponseCallback): void 
    {
        if (this.published)
        {
            callback();
            return;
        }

        console.log('MaruMaru ran at ' + (new Date()).toLocaleTimeString());
        this.check(callback);
    }

    /**
     * Check the website if it's posted the new chapter
     * 
     * @private
     * @param {CrawlerResponseCallback} callback 
     * @memberof MaruMaruCrawler
     */
    private check(callback: CrawlerResponseCallback): void 
    {
        Download('https://marumaru.in/b/manga/82810', (error: any, response: any, body: string) =>
        {
            // Checking if we have errors
            if (error != null)
            {
                console.log('Error in MaruMaru crawler at Download function.');
                console.log(error);
                callback();
                return;
            }

            let HTMLContent: string = body;

            const data = HTMLContent.match(/<a[^<>]*?href="https?:\/\/wasabisyrup.com\/archives\/[a-zA-Z0-9_-]*"[^<>]*?>\s*<font[^<>]*?>\s*<span[^<>]*?>\s*진격의\s*거인\s*106\s*화\s*<\/span>\s*<\/font>\s*<\/a>/g);
   
            // No new chapter
            if (data == null)
            {
                callback();
                return;
            }

            const match = data[0].match(/https?:\/\/wasabisyrup.com\/archives\/[a-zA-Z0-9_-]*/g);
            const link = match[0];

            this.published = true;

            callback
            (
                {
                    message: 'New chapter published on MaruMaru',
                    link: link
                }
            );
        });
    }
}
export const MaruMaru: MaruMaruCrawler = new MaruMaruCrawler();