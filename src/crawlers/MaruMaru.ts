import { Crawler } from "./Crawler";
import { Download } from '../download';

class MaruMaruCrawler extends Crawler
{
    private published: boolean = false;

    protected async html(): Promise<string>
    {
        return new Promise<string>
        (
            (resolve) => 
            {
                Download('https://marumaru.in/b/manga/82810', (error: any, response: any, body: string) =>
                {
                    // Checking if we have errors
                    if (error != null)
                    {
                        console.log('Error in MaruMaru crawler at Download function.');
                        console.log(error);
                        resolve(null);
                        return;
                    }
        
                    resolve(body);
                });
            }
        );
    }

    private newChapter(html: string): string
    {
        if (html == null)
        {
            return null;
        }

        const data = html.match(/<a[^<>]*?href="https?:\/\/wasabisyrup.com\/archives\/[^"]*?"[^<>]*?>[^<>]*?진격의\s*거인\s*107\s*화[^<>]*?<\/a>/g);
   
        // No new chapter
        if (data == null)
        {
            return null;
        }

        const match = data[0].match(/https?:\/\/wasabisyrup.com\/archives\/[^"]*/g);
        const link = match[0];

        return link;
    }

    protected async fn(): Promise<CrawlerDataResponse[]>
    {
        if (this.published) 
        {
            return [];
        }

        console.log('MaruMaru ran at ' + (new Date()).toLocaleTimeString());

        const HTMLContent: string = await this.html();
        const link: string = this.newChapter(HTMLContent);    
        if (link == null)
        {
            return [];
        }

        this.published = true;
        const response = [
            {
                message: 'Chapter published by MaruMaru',
                link: link,
                legit: true
            }
        ];
        return response;
    }

    protected Reset(): void 
    {
        this.published = false;
    }
}

export const MaruMaru = new MaruMaruCrawler();