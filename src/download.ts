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
        (error: any, response: any, body: string) => 
        {
            let _body: string = body;
            _body = _body.replace(/(\r\n\t|\n|\r\t)/gm,"");
            _body = _body.replace(/<script[^<>]*?>[^<>]*?<\/script>/g, "");

            callback(error, response, _body);
        }
    );
}