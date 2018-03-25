# TODO:
### Move bot commands in functions.
### Make some crawlers.

# Crawler arhitecture
#### It need to download with HTTP request a webiste, search for specific words and get the content, compare the content with what bot already put on Discord (maybe SQLite?)
#### The crawl need to return an object, if nothing was found will return null.
#### Interceptor check for responses which are not null and send message on Discord.

# List with Crawlers:
#### Yonkou: https://twitter.com/yonkouprod + https://www.reddit.com/user/YonkouProductions
#### r/ShingekiNoKyojin (searching on festival thread and pre-release thread)
#### Baidu https://tieba.baidu.com/f?kw=%E8%BF%9B%E5%87%BB%E7%9A%84%E5%B7%A8%E4%BA%BA%E5%88%86%E6%9E%90 (I think it's chinese, we need specific words)
#### Ryokutya http://ryokutya2089.com/ (we need specific words)
#### MaruMaru https://marumaru.in/b/manga/82810 Korean expression for AoT: 진격의거인
#### Maybe a crawler on Google Images
