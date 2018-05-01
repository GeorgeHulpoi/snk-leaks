const HTTP = require('https');

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
        this.getThreads(callback);
        console.log('Baidu runned at ' + (new Date()).toLocaleTimeString());
    }

    private getThreads(callback: CrawlerResponseCallback): void 
    {
        HTTP.get
        (
            'https://tieba.baidu.com/f?kw=%E8%BF%9B%E5%87%BB%E7%9A%84%E5%B7%A8%E4%BA%BA%E5%88%86%E6%9E%90&ie=utf-8',
            (response: any) => 
            {
                var HTMLContent = "";

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

                        // Get the threads
                        const data = HTMLContent.match(/<ul\s*id="thread_list"\s*class="threadlist_bright j_threadlist_bright">[^\n]*?<\/ul>\s*<div\s*class="thread_list_bottom clearfix">/g);
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
                                // Check if exist already in list
                                if (this.List.indexOf(Article[1]) == -1)
                                {
                                    callback
                                    (
                                        {
                                            message: 'Baidu new thread',
                                            link: 'https://tieba.baidu.com/p/' + Article[1]
                                        }
                                    );
                                    // If not, add it and message the users.
                                    this.List.push(Article[1]);
                                    return;
                                }
                            }
                        }

                        callback();
                    }
                );  
            }
        );              
    }
}
export let Baidu = new BaiduCrawler();