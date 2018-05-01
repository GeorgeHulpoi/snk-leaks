# Crawler arhitecture
#### It need to download with HTTP request a webiste, search for specific words and get the content, compare the content with what bot already put on Discord.
#### The crawl need to return an object, if nothing was found will return null.
#### Interceptor check for responses which are not null and send message on Discord.

# MaruMaru arhitecture
### 1. Download the website
### 2. Verify with Regex if exist a link to 105 chapter
### 3. If exist, put on Discord and stop this crawler (not all).
#### This need to be updated every month (just change the chapter number).

# Wasabysyrup arhitecture
### 1. Download the website
### 2. Get all articles with regex (without sticky post).
### 3. Verify if it some new article.
#### 3.1 If it is, open the full article (read more).
#### 3.2 Verify with Regex some words
#### 3.3 If are that words, put on Discord

# TO DO
#### Function for all crawlers to check if it's outdated.
#### Tame the bot, only a man or a Rule group can use it.

# List with Crawlers:
#### Baidu https://tieba.baidu.com/f?kw=%E8%BF%9B%E5%87%BB%E7%9A%84%E5%B7%A8%E4%BA%BA%E5%88%86%E6%9E%90 (I think it's chinese, we need specific words)
#### Maybe a crawler on Google Images
