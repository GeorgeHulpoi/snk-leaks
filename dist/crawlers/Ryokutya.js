"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Crawler_1 = require("./Crawler");
var download_1 = require("../download");
var RyokutyaCrawler = (function (_super) {
    __extends(RyokutyaCrawler, _super);
    function RyokutyaCrawler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.KnownIDS = [];
        return _this;
    }
    RyokutyaCrawler.prototype.html = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        download_1.Download('http://ryokutya2089.com', function (error, response, body) {
                            if (error != null) {
                                console.log('Error in Ryokutya crawler at Download function.');
                                console.log(error);
                                resolve(null);
                                return;
                            }
                            var data = body.match(/<div\s*id="primary"\s*class="site-content">.*?<\/div><!--\s*#primary\s*-->/g);
                            if (data == null) {
                                console.log('Ryokutya crawler it\'s outdated!');
                                resolve(null);
                                return;
                            }
                            var data2 = data[0].replace(/<article[^<>]*?class="[^"]*?post-96[^"]*?"[^<>]*?>.*?<\/article><!-- #post -->/g, "");
                            resolve(data2);
                        });
                    })];
            });
        });
    };
    RyokutyaCrawler.prototype.ids = function (html) {
        if (html == null) {
            return [];
        }
        var HTMLContent = html;
        var list = [];
        var Article;
        while ((Article = (/<article[^<>]*?id="post-(\d*)"[^<>]*?>/g).exec(HTMLContent)) != null) {
            HTMLContent = HTMLContent.replace(Article[0], "");
            list.push(Number(Article[1]));
        }
        return list;
    };
    RyokutyaCrawler.prototype.unknownIds = function (ids) {
        var news = [];
        var len = ids.length;
        for (var i = 0; i < len; ++i) {
            if (this.KnownIDS.indexOf(ids[i]) == -1) {
                news.push(ids[i]);
                this.KnownIDS.push(ids[i]);
            }
        }
        return news;
    };
    RyokutyaCrawler.prototype.checkContent = function (content) {
        var data = content.match(/(進撃|巨人)/g);
        return (data == null) ? false : true;
    };
    RyokutyaCrawler.prototype.checkPost = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        download_1.Download('http://ryokutya2089.com/archives/' + id, function (error, response, body) {
                            if (error != null) {
                                console.log('Error in Ryokutya crawler at Download function.');
                                console.log(error);
                                resolve(false);
                                return;
                            }
                            var HTMLContent = body;
                            var data = HTMLContent.match(/<article\s*id="post-[0-9]*"\s*class="[^"]*?">.*?<\/article>/g);
                            if (data == null) {
                                console.log('Ryokutya crawler it\'s outdated!');
                                resolve(false);
                                return;
                            }
                            HTMLContent = data[0];
                            if (_this.checkContent(HTMLContent)) {
                                resolve(true);
                            }
                            else {
                                resolve(false);
                            }
                        });
                    })];
            });
        });
    };
    RyokutyaCrawler.prototype.snkIDs = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var list, len, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        list = [];
                        len = ids.length;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < len)) return [3, 4];
                        return [4, this.checkPost(ids[i])];
                    case 2:
                        if (_a.sent()) {
                            list.push({
                                message: 'New post by Ryokutya',
                                link: 'http://ryokutya2089.com/archives/' + ids[i],
                                legit: true
                            });
                        }
                        _a.label = 3;
                    case 3:
                        ++i;
                        return [3, 1];
                    case 4: return [2, list];
                }
            });
        });
    };
    RyokutyaCrawler.prototype.fn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var HTMLContent, IDs, news, snk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Ryokutya ran at ' + (new Date()).toLocaleTimeString());
                        return [4, this.html()];
                    case 1:
                        HTMLContent = _a.sent();
                        IDs = this.ids(HTMLContent);
                        news = this.unknownIds(IDs);
                        return [4, this.snkIDs(news)];
                    case 2:
                        snk = _a.sent();
                        return [2, snk];
                }
            });
        });
    };
    RyokutyaCrawler.prototype.Reset = function () {
        this.KnownIDS = [];
    };
    return RyokutyaCrawler;
}(Crawler_1.Crawler));
exports.Ryokutya = new RyokutyaCrawler();
