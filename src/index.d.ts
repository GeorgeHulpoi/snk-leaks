declare type CrawlerResponseCallback = (response?: CrawlerDataResponse) => void;
declare type DownloadResponseCallback = (error: any, response: any, body: any) => void;
declare type CrawlerEndCallback = (response: any) => void;


interface CrawlerDataResponse
{
    message: string;
    link: string;
    img?: string;
    legit?: boolean;
}
