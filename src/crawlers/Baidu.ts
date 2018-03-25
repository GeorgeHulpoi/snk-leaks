const https = require('https');
import { crawl } from "../crawler";

class BaiduCrawler implements crawl
{
    constructor()
    {

    }

    public crawl(callback?: (response: any) => void): void 
    {
        if (typeof callback === "function")
        {
            callback('Baidu called');
        }
    }
}

export let Baidu = new BaiduCrawler();