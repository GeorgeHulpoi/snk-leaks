"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Config = require('../config.json');
var request = require('request');
var RedditClass = (function () {
    function RedditClass() {
        this.Token = null;
    }
    RedditClass.prototype.tokenExist = function () {
        return (this.Token != null);
    };
    RedditClass.prototype.checkToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var time;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.Token === null)
                            return [2];
                        time = Math.floor(Date.now() / 1000);
                        if (!(time >= this.Token.expires_in)) return [3, 2];
                        return [4, this.refresh_token()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    RedditClass.prototype.refresh_token = function () {
        return __awaiter(this, void 0, void 0, function () {
            var time, headers, options;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.Token === null) {
                    return [2, false];
                }
                time = Math.floor(Date.now() / 1000);
                headers = {
                    Authorization: "Basic " + new Buffer(Config.reddit.client + ":" + Config.reddit.secret).toString("base64")
                };
                options = {
                    url: 'https://www.reddit.com/api/v1/access_token',
                    method: 'POST',
                    headers: headers,
                    form: {
                        grant_type: 'refresh_token',
                        refresh_token: this.Token.refresh_token
                    }
                };
                return [2, new Promise(function (resolve) {
                        request(options, function (error, response, body) {
                            if (error) {
                                console.log(error);
                                resolve(false);
                                return;
                            }
                            var data = JSON.parse(body);
                            if (data.error) {
                                console.log(data.error);
                                resolve(false);
                                return;
                            }
                            _this.Token.access_token = data.access_token;
                            _this.Token.expires_in = time + data.expires_in;
                            resolve(true);
                            return;
                        });
                    })];
            });
        });
    };
    RedditClass.prototype.request_token = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, options, time;
            var _this = this;
            return __generator(this, function (_a) {
                headers = {
                    Authorization: "Basic " + new Buffer(Config.reddit.client + ":" + Config.reddit.secret).toString("base64")
                };
                options = {
                    url: 'https://www.reddit.com/api/v1/access_token?state=' + Config.reddit.state + '&client_id' + Config.reddit.client + '&redirect_uri=' + Config.reddit.uri + '&grant_type=authorization_code&code=' + code,
                    method: 'POST',
                    headers: headers
                };
                time = Math.floor(Date.now() / 1000);
                return [2, new Promise(function (resolve) {
                        request(options, function (error, response, body) {
                            if (error) {
                                console.log(error);
                                resolve('Error at HTTP Request function');
                                return;
                            }
                            var data = JSON.parse(body);
                            if (data.error) {
                                console.log(data.error);
                                resolve(data.error);
                                return;
                            }
                            _this.Token =
                                {
                                    access_token: data.access_token,
                                    token_type: data.token_type,
                                    expires_in: time + data.expires_in,
                                    refresh_token: data.refresh_token
                                };
                            resolve('Received the token');
                        });
                    })];
            });
        });
    };
    RedditClass.prototype.comment = function (fullname, text) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.Token === null)
                            return [2, '**You need to get a token first.**'];
                        return [4, this.checkToken()];
                    case 1:
                        _a.sent();
                        return [2, new Promise(function (resolve) {
                                var headers = {
                                    Authorization: _this.Token.token_type + " " + _this.Token.access_token
                                };
                                headers['User-Agent'] = 'Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36';
                                var options = {
                                    url: 'https://oauth.reddit.com/api/comment?api_type=json&return_rtjson=false&text=' + text + '&thing_id=' + fullname,
                                    method: 'POST',
                                    headers: headers
                                };
                                request(options, function (error, response, body) {
                                    if (error) {
                                        console.log(error);
                                        resolve(null);
                                        return;
                                    }
                                    var json = JSON.parse(body).json;
                                    if (json) {
                                        if (json.errors.length) {
                                            console.log(json.errors);
                                            resolve(null);
                                            return;
                                        }
                                        resolve('https://www.reddit.com' + json.data.things[0].data.permalink);
                                    }
                                    else {
                                        console.log(body);
                                    }
                                });
                            })];
                }
            });
        });
    };
    return RedditClass;
}());
exports.Reddit = new RedditClass();
