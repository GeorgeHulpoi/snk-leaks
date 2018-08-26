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
var ZekkenCrawler = (function (_super) {
    __extends(ZekkenCrawler, _super);
    function ZekkenCrawler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.KnownIDS = [];
        return _this;
    }
    ZekkenCrawler.prototype.html = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        download_1.Download('http://m.tw.weibo.com/zekken', function (error, response, body) {
                            if (error != null) {
                                console.log('Error in Zekken crawler at Download function.');
                                console.log(error);
                                resolve(null);
                                return;
                            }
                            var data = body.match(/<ul\s*class="lists"\s*>.*?<\/ul>\s*<input/g);
                            if (data == null) {
                                console.log('Zekken crawler it\'s outdated!');
                                resolve(null);
                                return;
                            }
                            resolve(data[0]);
                        });
                    })];
            });
        });
    };
    ZekkenCrawler.prototype.ids = function (html) {
        if (html == null) {
            return [];
        }
        var HTMLContent = html;
        var list = [];
        var Article;
        while ((Article = (/<li\s*class="picone"\s*>(.*?)<\/li>\s*<!--/g).exec(HTMLContent)) != null) {
            HTMLContent = HTMLContent.replace(Article[0], "");
            var id = Number(((/<a\s*href="\/zekken\/([0-9]*)"\s*>/g).exec(Article[1]))[1]);
            list.push(id);
        }
        return list;
    };
    ZekkenCrawler.prototype.unknownIds = function (ids) {
        var news = [];
        var len = ids.length;
        for (var i = 0; i < len; ++i) {
            if (this.KnownIDS.indexOf(ids[i]) == -1) {
                news.push({
                    message: 'New photos posted by Zekken',
                    link: 'http://m.tw.weibo.com/zekken/' + ids[i]
                });
                this.KnownIDS.push(ids[i]);
            }
        }
        return news;
    };
    ZekkenCrawler.prototype.fn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var HTMLContent, IDs, news;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Zekken ran at ' + (new Date()).toLocaleTimeString());
                        return [4, this.html()];
                    case 1:
                        HTMLContent = _a.sent();
                        IDs = this.ids(HTMLContent);
                        news = this.unknownIds(IDs);
                        return [2, news];
                }
            });
        });
    };
    ZekkenCrawler.prototype.Reset = function () {
        this.KnownIDS = [];
    };
    return ZekkenCrawler;
}(Crawler_1.Crawler));
exports.Zekken = new ZekkenCrawler();
