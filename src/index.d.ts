declare type CrawlerResponseCallback = (response?: CrawlerResponse) => void;
declare type DownloadResponseCallback = (error: any, response: any, body: any) => void;

interface crawl
{
    /**
     * This function is used to get data from website
     * 
     * @param {(response: any) => void} [callback] 
     * @memberof crawl
     */
    crawl(callback?: (response: any) => void): void;
    /**
     * Reset all data in crawler
     * 
     * @memberof crawl
     */
    reset(): void;
}

interface CrawlerResponse
{
    message: string;
    link: string;
}