declare type CrawlerResponseCallback = (response?: CrawlerResponse) => void;
declare type DownloadResponseCallback = (error: any, response: any, body: any) => void;

interface Crawler
{
    /**
     * This function is used to get data from website
     * 
     * @param {(response: any) => void} [callback] 
     * @memberof Crawler
     */
    crawl(callback?: (response: any) => void): void;
    /**
     * Reset all data in crawler
     * 
     * @memberof Crawler
     */
    reset(): void;
}

interface CrawlerResponse
{
    message: string;
    link: string;
    img?: string;
    legit?: boolean;
}