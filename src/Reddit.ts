const Config = require('../config.json');
const request = require('request');

class RedditClass
{
    private Token: Token = null;

    constructor()
    {

    }

    public tokenExist(): boolean 
    {
        return (this.Token != null);
    }

    private async checkToken(): Promise<void>
    {
        if (this.Token === null) return;

        const time: number = Math.floor(Date.now() / 1000);

        if (time >= this.Token.expires_in)
        {
            await this.refresh_token();
        }
    }

    public async refresh_token(): Promise<boolean>
    {
        if (this.Token === null)
        {
            return false;
        }

        const time: number = Math.floor(Date.now() / 1000);

        let headers: any = 
        {
            Authorization: "Basic " + new Buffer(Config.reddit.client + ":" + Config.reddit.secret).toString("base64")
        };
    
        const options = 
        {
            url: 'https://www.reddit.com/api/v1/access_token',
            method: 'POST',
            headers: headers,
            form: 
            {
                grant_type: 'refresh_token',
                refresh_token: this.Token.refresh_token
            }
        };

        return new Promise<boolean>
        (
            (resolve) => 
            {
                request
                (
                    options,
                    (error: any, response: any, body: string) => 
                    {
                        if (error)
                        {
                            console.log(error);
                            resolve(false);
                            return;
                        }

                        const data = JSON.parse(body);

                        if (data.error)
                        {
                            console.log(data.error);
                            resolve(false);
                            return;
                        }

                        this.Token.access_token = data.access_token;
                        this.Token.expires_in = time + data.expires_in;
                        
                        resolve(true);
                        return;
                    }
                );
            }
        );
    }

    public async request_token(code: string): Promise<string>
    {
        let headers: any = 
        {
            Authorization: "Basic " + new Buffer(Config.reddit.client + ":" + Config.reddit.secret).toString("base64")
        };
    
        const options = 
        {
            url: 'https://www.reddit.com/api/v1/access_token?state=' + Config.reddit.state + '&client_id' + Config.reddit.client + '&redirect_uri=' + Config.reddit.uri + '&grant_type=authorization_code&code=' + code,
            method: 'POST',
            headers: headers
        };
    
        const time: number = Math.floor(Date.now() / 1000);

        return new Promise<string>
        (
            (resolve) => 
            {
                request
                (
                    options,
                    (error: any, response: any, body: string) => 
                    {
                        if (error)
                        {
                            console.log(error);
                            resolve('Error at HTTP Request function');
                            return;
                        }

                        const data: any = JSON.parse(body);

                        if (data.error)
                        {
                            console.log(data.error);
                            resolve(data.error);
                            return;
                        }

                        this.Token = 
                        {
                            access_token: data.access_token,
                            token_type: data.token_type,
                            expires_in: time + data.expires_in,
                            refresh_token: data.refresh_token
                        };

                        resolve('Received the token');
                    }
                );
            }
        );
    }

    public async comment(fullname: string, text: string): Promise<string>
    {
        if (this.Token === null) return '**You need to get a token first.**';

        await this.checkToken();

        return new Promise<string>
        (
            (resolve) => 
            {
                let headers: any = 
                {
                    Authorization: this.Token.token_type + " " + this.Token.access_token
                };
        
                headers['User-Agent'] = 'Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36';
            
                const options = 
                {
                    url: 'https://oauth.reddit.com/api/comment?api_type=json&return_rtjson=false&text=' + text + '&thing_id=' + fullname,
                    method: 'POST',
                    headers: headers
                };

                request
                (
                    options,
                    (error: any, response: any, body: string) => 
                    {
                        if (error)
                        {
                            console.log(error);
                            resolve(null);
                            return;
                        }

                        const json = JSON.parse(body).json;

                        if (json)
                        {
                            if (json.errors.length)
                            {
                                console.log(json.errors);
                                resolve(null);
                                return;
                            }
    
                            resolve('https://www.reddit.com' + json.data.things[0].data.permalink);
                        }
                        else 
                        {
                            console.log(body);
                        }
                    }
                );
            }
        );
    }
}

export const Reddit = new RedditClass();

export interface Token 
{
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
}