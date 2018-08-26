import { Crawler } from "./Crawler";
import { Download } from '../download';

class RyokutyaCrawler extends Crawler
{
    private KnownIDS: number[] = [];

    protected async html(): Promise<string>
    {
        return new Promise<string>
        (
            (resolve) => 
            {
                Download('http://ryokutya2089.com', (error: any, response: any, body: string) =>
                {
                    // Checking if we have errors
                    if (error != null)
                    {
                        console.log('Error in Ryokutya crawler at Download function.');
                        console.log(error);
                        resolve(null);
                        return;
                    }
        
                    // Get the content from body
                    const data = body.match(/<div\s*id="primary"\s*class="site-content">.*?<\/div><!--\s*#primary\s*-->/g);
                    if (data == null)
                    {
                        console.log('Ryokutya crawler it\'s outdated!');
                        resolve(null);
                        return;
                    }

                    // Remove the first article which is a sticky article
                    const data2 = data[0].replace(/<article[^<>]*?class="[^"]*?post-96[^"]*?"[^<>]*?>.*?<\/article><!-- #post -->/g, "");
                    resolve(data2);
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

        while ((Article = (/<article[^<>]*?id="post-(\d*)"[^<>]*?>/g).exec(HTMLContent)) != null) 
        {
            // Delete from content
            HTMLContent = HTMLContent.replace(Article[0], "");
            list.push(Number(Article[1]));
        }

        return list;
    }

    private unknownIds(ids: number[]): number[]
    {
        let news: number[] = [];
        const len = ids.length;
        for (let i = 0; i < len; ++i)
        {
            if (this.KnownIDS.indexOf(ids[i]) == -1)
            {
                news.push(ids[i]);
                this.KnownIDS.push(ids[i]);
            }
        }
        return news;
    }

    private checkContent(content: string): boolean 
    {
        const data = content.match(/(進撃|巨人)/g);
        return (data == null) ? false : true;
    }

    private async checkPost(id: number): Promise<boolean>
    {
        return new Promise<boolean>
        (
            (resolve) => 
            {
                Download('http://ryokutya2089.com/archives/' + id, (error: any, response: any, body: string) =>
                {
                    // Checking if we have errors
                    if (error != null)
                    {
                        console.log('Error in Ryokutya crawler at Download function.');
                        console.log(error);
                        resolve(false);
                        return;
                    }

                    let HTMLContent: string = body;

                    const data = HTMLContent.match(/<article\s*id="post-[0-9]*"\s*class="[^"]*?">.*?<\/article>/g);
                    if (data == null)
                    {
                        console.log('Ryokutya crawler it\'s outdated!');
                        resolve(false);
                        return;
                    }
                    HTMLContent = data[0];

                    if (this.checkContent(HTMLContent))
                    {
                        resolve(true);
                    }
                    else 
                    {
                        resolve(false);
                    }
                });
            }
        );
    }

    private async snkIDs(ids: number[]): Promise<CrawlerDataResponse[]>
    {
        let list: CrawlerDataResponse[] = [];
        const len = ids.length;
        for (let i = 0; i < len; ++i)
        {
            if (await this.checkPost(ids[i]))
            {
                list.push 
                (
                    {
                        message: 'New post by Ryokutya',
                        link: 'http://ryokutya2089.com/archives/' + ids[i],
                        legit: true
                    }
                );
            }
        }

        return list;
    }

    protected async fn(): Promise<CrawlerDataResponse[]>
    {
        console.log('Ryokutya ran at ' + (new Date()).toLocaleTimeString());

        const HTMLContent: string = await this.html();
        const IDs: any[] = this.ids(HTMLContent);
        const news: number[] = this.unknownIds(IDs);
        const snk: CrawlerDataResponse[] = await this.snkIDs(news);

        return snk;
    }

    protected Reset(): void 
    {
        this.KnownIDS = [];
    }
}

export const Ryokutya = new RyokutyaCrawler();