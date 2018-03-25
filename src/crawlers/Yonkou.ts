const https = require('https');
import { crawl } from "../crawler";

class YonkouCrawler implements crawl
{
    constructor()
    {

    }

    public crawl(callback?: (response: any) => void): void 
    {
        if (typeof callback === "function")
        {
            callback('Yonkou called');
        }
    }
}

export let Yonkou = new YonkouCrawler();