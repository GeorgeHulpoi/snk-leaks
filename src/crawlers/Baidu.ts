import { Crawler } from "../crawler";
import { Download } from "../download";

class BaiduCrawler implements crawl
{
    public List: number[] = [];

    constructor()
    {

    }

    public reset(): void 
    {
        this.List = [];
    }

    public crawl(callback: CrawlerResponseCallback): void 
    {
        this.check(callback);
        console.log('Baidu ran at ' + (new Date()).toLocaleTimeString());
    }

    /**
     * Check the new articles and publish them!
     * 
     * @private
     * @param {CrawlerResponseCallback} callback 
     * @memberof BaiduCrawler
     */
    private check(callback: CrawlerResponseCallback): void
    {
        this.getThreads
        (
            (list?: number[]) => 
            {
                const len = list.length;

                for (let i = 0; i < len; ++i)
                {
                    this.List.push(list[i]);

                    // Dayum.. I don't like to write codes like this!!
                    Crawler.Interceptor
                    (
                        {
                            message: 'Baidu new thread',
                            link: 'https://tieba.baidu.com/p/' + list[i]
                        }
                    );
                }

                callback();
            }
        );
    }

    /**
     * Get all articles ID in an array
     * 
     * @private
     * @param {(list?: number[]) => void} callback 
     * @memberof BaiduCrawler
     */
    private getThreads(callback: (list?: number[]) => void): void
    {
        Download('https://tieba.baidu.com/f?kw=%E8%BF%9B%E5%87%BB%E7%9A%84%E5%B7%A8%E4%BA%BA%E5%88%86%E6%9E%90&ie=utf-8', (error: any, response: any, body: string) => 
        {
            let List: number[] = [];

            // Checking if we have errors
            if (error != null)
            {
                console.log('Error in MaruMaru crawler at Download function.');
                console.log(error);
                callback();
                return;
            }

            let HTMLContent: string = body;
            HTMLContent = this.CleanHTML(HTMLContent);

            // Get the articles
            const data = HTMLContent.match(/<ul\s*id="thread_list"\s*class="threadlist_bright j_threadlist_bright">[^\n]*?<\/ul>\s*<div\s*class="thread_list_bottom clearfix">/g);
            if (data == null)
            {
                console.log('Baidu crawler it\'s outdated!');
            }  
            HTMLContent = data[0];        
            
            // Get every article
            let Article: any;
            while ((Article = (/<a[^<>]*?href="\/p\/([0-9]*)"[^<>]*?class="\s*j_th_tit\s*"[^<>]*?>/g).exec(HTMLContent)) != null) 
            {
                HTMLContent = HTMLContent.replace(Article[0], "");

                // Check if have in title the number of chapter
                const data2 = Article[0].match(/title="[^"]*?105[^"]*?"/g);
                if (data2 != null)
                {

                    const nr = Number(Article[1]);
                    if (this.List.indexOf(nr) == -1)
                    {
                        List.push(nr);
                    }
                }
            }

            callback(List);
        });
    }

    /**
     * Remove the scripts and unseen elements
     * 
     * @private
     * @param {string} html 
     * @returns {string} 
     * @memberof BaiduCrawler
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
export const Baidu: any = new BaiduCrawler();