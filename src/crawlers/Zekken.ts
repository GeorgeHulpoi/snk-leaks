import { Crawler } from "./Crawler";
import { Download } from '../download';

class ZekkenCrawler extends Crawler
{
    private KnownIDS: number[] = [];

    protected async html(): Promise<string>
    {
        return new Promise<string>
        (
            (resolve) => 
            {
                Download('http://m.tw.weibo.com/zekken', (error: any, response: any, body: string) =>
                {
                    // Checking if we have errors
                    if (error != null)
                    {
                        console.log('Error in Zekken crawler at Download function.');
                        console.log(error);
                        resolve(null);
                        return;
                    }

                    const data = body.match(/<ul\s*class="lists"\s*>.*?<\/ul>\s*<input/g);
        
                    // No new chapter
                    if (data == null)
                    {
                        console.log('Zekken crawler it\'s outdated!');
                        resolve(null);
                        return;
                    }

                    resolve(data[0]);
                });
            }
        );
    }

    private ids(html: string): number[]
    {
        if (html == null)
        {
            return [];
        }
        let HTMLContent: string = html;
        let list: number[] = [];
        let Article: any;
        while ((Article = (/<li\s*class="picone"\s*>(.*?)<\/li>\s*<!--/g).exec(HTMLContent)) != null) 
        {
            HTMLContent = HTMLContent.replace(Article[0], "");

            const id: number = Number(((/<a\s*href="\/zekken\/([0-9]*)"\s*>/g).exec(Article[1]))[1]);
            list.push(id);
        }
        return list;
    }

    private unknownIds(ids: number[]): CrawlerDataResponse[]
    {
        let news: CrawlerDataResponse[] = [];
        const len = ids.length;
        for (let i = 0; i < len; ++i)
        {
            if (this.KnownIDS.indexOf(ids[i]) == -1)
            {
                news.push
                (                  
                    {
                        message: 'New photos posted by Zekken',
                        link: 'http://m.tw.weibo.com/zekken/' + ids[i]
                    }
                );
                this.KnownIDS.push(ids[i]);
            }
        }

        return news;
    }

    protected async fn(): Promise<CrawlerDataResponse[]>
    {
        console.log('Zekken ran at ' + (new Date()).toLocaleTimeString());

        const HTMLContent: string = await this.html();
        const IDs: any[] = this.ids(HTMLContent);
        const news: CrawlerDataResponse[] = this.unknownIds(IDs);

        return news;
    }

    protected Reset(): void 
    {
        this.KnownIDS = [];
    }
}

export const Zekken = new ZekkenCrawler();