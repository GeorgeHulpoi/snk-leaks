const HTTP = require('https');
const URL = require('url');
const cloudscraper = require('cloudscraper');

class MaruMaruCrawler implements crawl
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
        if (!this.published)
        {
            this.check(callback);
        }
    }

    private check(callback: CrawlerResponseCallback): void 
    {
        cloudscraper.get
        (
            'https://marumaru.in/b/manga/82810', 
            (error: any, response: any, body: string) => 
            {
                if (error)
                {
                    
                }
                else 
                {
                    let HTMLContent: string = body;

                    // Remove the non-see elements
                    HTMLContent = HTMLContent.replace(/(\r\n\t|\n|\r\t)/gm,"");
                    // Remove the scripts
                    HTMLContent = HTMLContent.replace(/<script[^<>]*?>[^<>]*?<\/script>/g, "");
                    HTMLContent = HTMLContent.replace(/<script[^<>]*?>[^<>]*?<\/script>/g, "");

                    const data = HTMLContent.match(/<a[^<>]*?href="(https?:\/\/wasabisyrup.com\/archives\/[^"]*?)"[^<>]*?>\s*<font[^<>]*?>\s*<span[^<>]*?>\s*진격의\s*거인\s*105\s*화\s*<\/span>\s*<\/font>\s*<\/a>/g);

                    if (data != null)
                    {
                        const match = data[0].match(/https?:\/\/wasabisyrup.com\/archives\/[a-zA-Z0-9-]*/g);
                        const link = match[0];

                        this.published = true;

                        callback
                        (
                            {
                                message: 'New chapter published on MaruMaru',
                                link: link
                            }
                        );
                    } 
                    else 
                    {
                        callback();
                    }
                }
            }
        );
    }

}
export let MaruMaru = new MaruMaruCrawler();