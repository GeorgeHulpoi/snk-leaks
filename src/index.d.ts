declare type CrawlerResponseCallback = (response?: CrawlerResponse) => void;

interface crawl
{
    crawl(callback?: (response: any) => void): void;
    reset(): void;
}

interface CrawlerResponse
{
    message: string;
    link: string;
}