import { Download } from '../download';

class RyokutyaCrawler implements crawl
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
        //this.getArticles(callback);
        console.log('Ryokutya ran at ' + (new Date()).toLocaleTimeString());
        this.check(callback);
    }

    /**
     * Check the website if it's something new
     * 
     * @private
     * @param {CrawlerResponseCallback} callback 
     * @memberof RyokutyaCrawler
     */
    private check(callback: CrawlerResponseCallback): void 
    {
        this.getAllArticles
        (
            (list?: string[]) => 
            {
                if (list == null)
                {
                    callback();
                    return;
                }

                const len: number = list.length;
                const before: number = this.lastArticle;
                for (let i = 0; i < len; ++i)
                {
                    if (Number(list[i]) > this.lastArticle)
                    {
                        this.lastArticle = Number(list[i]);
                    }
                }

                if (before != this.lastArticle)
                {
                    this.checkArticle(this.lastArticle, (newest?: boolean) => 
                    {
                        if (newest == null)
                        {
                            callback();
                            return;
                        }

                        if (newest)
                        {
                            callback
                            (
                                {
                                    message: 'New post on Ryokutya',
                                    link: 'http://ryokutya2089.com/archives/' + this.lastArticle
                                }
                            );
                        }
                        else 
                        {
                            callback();
                        }
                    });
                }
                else 
                {
                    callback();
                }
            }
        );
    }

    /**
     * Get all articles id
     * 
     * @private
     * @param {(list?: string[]) => void} callback 
     * @memberof RyokutyaCrawler
     */
    private getAllArticles(callback: (list?: string[]) => void): void 
    {
        let List: string[] = [];

        Download('http://ryokutya2089.com', (error: any, response: any, body: string) =>
        {
            // Checking if we have errors
            if (error != null)
            {
                console.log('Error in Ryokutya crawler at Download function.');
                console.log(error);
                callback();
                return;
            }

            let HTMLContent: string = body;
            HTMLContent = this.CleanHTML(HTMLContent);

            // Get the content from body
            const data = HTMLContent.match(/<div\s*id="primary"\s*class="site-content">.*?<\/div><!--\s*#primary\s*-->/g);
            if (data == null)
            {
                console.log('Ryokutya crawler it\'s outdated!');
                callback();
                return;
            }
            HTMLContent = data[0];
            // Remove the first article which is a sticky article
            HTMLContent = HTMLContent.replace(/<article[^<>]*?class="[^"]*?post-96[^"]*?"[^<>]*?>.*?<\/article><!-- #post -->/g, "");
                    
            let Article: any;
            while ((Article = (/<article[^<>]*?id="post-(\d*)"[^<>]*?>/g).exec(HTMLContent)) != null) 
            {
                // Delete from content
                HTMLContent = HTMLContent.replace(Article[0], "");
                List.push(Article[1]);
            }

            callback(List);
        });
    }

    /**
     * Check if the post it's related for leaks
     * 
     * @private
     * @param {number} id 
     * @param {(newest?: boolean) => void} callback 
     * @memberof RyokutyaCrawler
     */
    private checkArticle(id: number, callback: (newest?: boolean) => void): void 
    {
        Download('http://ryokutya2089.com/archives/' + id, (error: any, response: any, body: string) =>
        {
            // Checking if we have errors
            if (error != null)
            {
                console.log('Error in Ryokutya crawler at Download function.');
                console.log(error);
                callback();
                return;
            }

            let HTMLContent: string = body;
            HTMLContent = this.CleanHTML(HTMLContent);

            const data = HTMLContent.match(/<article\s*id="post-[0-9]*"\s*class="[^"]*?">.*?<\/article>/g);
            if (data == null)
            {
                console.log('Ryokutya crawler it\'s outdated!');
                callback();
                return;
            }
            HTMLContent = data[0];

            if (this.checkContent(HTMLContent))
            {
                callback(true);
            }
            else 
            {
                callback(false);
            }
        });
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

    /**
     * Remove the scripts and unseen elements
     * 
     * @private
     * @param {string} html 
     * @returns {string} 
     * @memberof RyokutyaCrawler
     */
    private CleanHTML(html: string): string 
    {
        let a: string = html;
        // Remove the non-see elements
        a = a.replace(/(\r\n\t|\n|\r\t)/gm,"");
        // Remove the scripts
        a = a.replace(/<script[^<>]*?>[^<>]*?<\/script>/g, "");
        return a;
    }
}
export let Ryokutya = new RyokutyaCrawler();