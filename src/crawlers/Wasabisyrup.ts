const HTTP = require('http');
const URL = require('url');

class WasabisyrupCrawler implements crawl
{
    private lastArticle: number = 0;

    constructor()
    {

    }

    public reset(): void 
    {
        this.lastArticle = 0;
    }

    public crawl(callback: CrawlerResponseCallback): void 
    {
        this.getArticles(callback);
    }

    /**
     * Check in all artiles to see if it's something new!
     * 
     * @private
     * @param {CrawlerResponseCallback} callback 
     * @memberof WasabisyrupCrawler
     */
    private getArticles(callback: CrawlerResponseCallback): void 
    {
        const Request = URL.parse('http://ryokutya2089.com');
        let header: any = {};
        header['User-Agent'] = 'Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36';
        const Config = 
        {
            host: Request.hostname,
            port: Request.port || 80,
            path: Request.pathname,
            headers: header,
            method: 'GET'
        };

        HTTP.get
        (
            Config, 
            (response: any) =>
            {
                response.setEncoding('utf8');

                let HTMLContent: string = '';

                // The content will come as buffer
                response.on
                (
                    'data',
                    (buffer: any) => 
                    {
                        HTMLContent += buffer.toString('utf8');
                    }
                );

                response.on
                (
                    'end',
                    () => 
                    {
                        // Remove the non-see elements
                        HTMLContent = HTMLContent.replace(/(\r\n\t|\n|\r\t)/gm,"");
                        // Get the content from body
                        const data = HTMLContent.match(/<div\s*id="primary"\s*class="site-content">.*?<\/div><!--\s*#primary\s*-->/g);
                        HTMLContent = data[0];
                        // Remove the scripts
                        HTMLContent = HTMLContent.replace(/<script[^<>]*?>[^<>]*?<\/script>/g, "");
                        // Remove the first article which is a sticky article
                        HTMLContent = HTMLContent.replace(/<article[^<>]*?class="[^"]*?post-96[^"]*?"[^<>]*?>.*?<\/article><!-- #post -->/g, "");
                    
                        // Start get every article

                        let found: boolean = false;
                        let Article: any;
                        while ((Article = (/<article[^<>]*?id="post-(\d*)"[^<>]*?>/g).exec(HTMLContent)) != null) 
                        {
                            // Delete from content
                            HTMLContent = HTMLContent.replace(Article[0], "");

                            // Every new post it's a lastArticle + n
                            if (Article[1] > this.lastArticle)
                            {
                                found = true;
                                this.lastArticle = Article[1];
                                this.checkArticle(this.lastArticle, callback);
                                break;
                            }
                        }

                        if (!found)
                        {
                            callback();
                        }
                    }
                );
            }
        ); 
    }

    /**
     * Open a article to see all content (read more)
     * 
     * @private
     * @param {number} id 
     * @param {CrawlerResponseCallback} callback 
     * @memberof WasabisyrupCrawler
     */
    private checkArticle(id: number, callback: CrawlerResponseCallback): void 
    {
        const Request = URL.parse('http://ryokutya2089.com/archives/' + id);
        let header: any = {};
        header['User-Agent'] = 'Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36';
        const Config = 
        {
            host: Request.hostname,
            port: Request.port || 80,
            path: Request.pathname,
            headers: header,
            method: 'GET'
        };

        HTTP.get
        (
            Config, 
            (response: any) =>
            {
                response.setEncoding('utf8');

                let HTMLContent: string = '';

                // The content will come as buffer
                response.on
                (
                    'data',
                    (buffer: any) => 
                    {
                        HTMLContent += buffer.toString('utf8');
                    }
                );

                response.on
                (
                    'end',
                    () => 
                    {
                        // Remove the non-see elements
                        HTMLContent = HTMLContent.replace(/(\r\n\t|\n|\r\t)/gm,"");
                        // Get the content from body
                        const data = HTMLContent.match(/<article\s*id="post-[0-9]*"\s*class="[^"]*?">.*?<\/article>/g);
                        HTMLContent = data[0];
                        

                        if (this.checkContent(HTMLContent))
                        {
                            callback
                            (
                                {
                                    message: 'Found a possibly leak.',
                                    link: 'http://ryokutya2089.com/archives/' + id
                                }
                            );
                        }
                        else 
                        {
                            callback();
                        }
                    }
                );
            }
        );        
    }

    /**
     * Searching for some words...
     * 
     * @private
     * @param {string} content 
     * @returns {boolean} 
     * @memberof WasabisyrupCrawler
     */
    private checkContent(content: string): boolean 
    {
        const data = content.match(/(進撃|巨人)/g);
        return (data == null) ? false : true;
    }
}
export let Wasabisyrup = new WasabisyrupCrawler();