const requestModule = require('request');
const jar = requestModule.jar();

const request = requestModule.defaults({jar: jar});
const UserAgent = 'Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36';
const Timeout = 6000;

export function Download(url: string, callback: DownloadResponseCallback): void
{
    let headers: any = {};
    headers['User-Agent'] = UserAgent;

    const options = 
    {
        url: url,
        method: 'GET',
        headers: headers
    };

    request
    (
        options,
        (error: any, response: any, body: any) => 
        {
            callback(error, response, body);
        }
    );
}