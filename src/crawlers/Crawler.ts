export abstract class Crawler
{
    static TIMEOUT: number = 10000;
    private firstRun: boolean = true;

    /**
     * This returns the new data
     * @protected
     * @abstract
     * @return Promise<CrawlerDataResponse[]> 
     * @memberof Crawler
     */
    protected abstract fn(): Promise<CrawlerDataResponse[]>;

    /**
     * Do not call this function, it's only for local crawler 
     * @protected
     * @abstract
     * @return {void}
     * @memberof Crawler
     */
    protected abstract Reset(): void;

    constructor() { }

    async start(end: CrawlerEndCallback): Promise<any>
    {
        let callback = end;

        setTimeout
        (
            () => {
                if (callback != null)
                {
                    callback([]);
                    callback = null;
                }
            },
            Crawler.TIMEOUT
        );

        const response: CrawlerDataResponse[] = await this.fn();

        if (callback != null)
        {
            if (this.firstRun)
            {
                callback([]);
                this.firstRun = false;
            }
            else 
            {
                callback(response);
            }
            callback = null;
        } 
    }

    public reset(): void 
    {
        this.firstRun = true;
        this.Reset();
    }
}
