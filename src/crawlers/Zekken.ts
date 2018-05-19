import { Download } from '../download';
import { Crawler} from '../crawler';

class ZekkenCrawler implements Crawler
{
    public lastArticle: number = 0;

    constructor()
    {

    }

    public reset(): void 
    {
        this.lastArticle = 0;
    }

    public crawl(callback: CrawlerResponseCallback): void 
    {
        const day = (new Date()).getUTCDate();
        if (day >= 3 && day <= 7)
        {
            console.log('Zekken ran at ' + (new Date()).toLocaleTimeString());
            this.check(callback);
        }
    }

    /**
     * Check the website if it's something new
     * 
     * @private
     * @param {CrawlerResponseCallback} callback 
     * @memberof ZekkenCrawler
     */
    private check(callback: CrawlerResponseCallback): void 
    {
        Download('http://m.tw.weibo.com/zekken', (error: any, response: any, body: string) =>
        {
            // Checking if we have errors
            if (error != null)
            {
                console.log('Error in Hupu crawler at Download function.');
                console.log(error);
                callback();
                return;
            }

            let HTMLContent: string = body;

            const data = HTMLContent.match(/<ul\s*class="lists"\s*>.*?<\/ul>\s*<input/g);
   
            // No new chapter
            if (data == null)
            {
                console.log('Zekken crawler it\'s outdated!');
                callback();
                return;
            }

            HTMLContent = data[0];

            let first: number = 0;
            let Article: any;
            while ((Article = (/<li\s*class="picone"\s*>(.*?)<\/li>\s*<!--/g).exec(HTMLContent)) != null) 
            {
                HTMLContent = HTMLContent.replace(Article[0], "");

                const id: number = Number(((/<a\s*href="\/zekken\/([0-9]*)"\s*>/g).exec(Article[1]))[1]);

                if (first == 0)
                {
                    first = id;
                }

                if (this.lastArticle == 0)
                {
                    this.lastArticle = id;
                }

                if (this.lastArticle == id)
                {
                    break;
                }

                const img: string = ((/<img[^<>]*?src="([^"]*?)"[^<>]*?>/g).exec(Article[1]))[1];

                Crawler.Interceptor
                (
                    {
                        message: 'Zekken posted new images',
                        link: 'http://m.tw.weibo.com/zekken/' + id,
                        img: img,
                    }
                );
            }

            this.lastArticle = first;
            callback();
        });
    }
}
export const Zekken: ZekkenCrawler = new ZekkenCrawler();