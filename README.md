# Crawler arhitecture
#### It need to download with HTTP request a webiste, search for specific words and get the content, compare the content with what bot already put on Discord.
#### The crawl need to return an object, if nothing was found will return null.
#### Interceptor check for responses which are not null and send message on Discord.

# MaruMaru arhitecture
### 1. Download the website
### 2. Verify with Regex if exist a link to 105 chapter
### 3. If exist, put on Discord and stop this crawler (not all).
#### This need to be updated every month (just change the chapter number).

# Ryokutya arhitecture (omg it's another name in crawlers.. sry)
### 1. Download the website
### 2. Get all articles with regex (without sticky post).
### 3. Verify if it some new article.
#### 3.1 If it is, open the full article (read more).
#### 3.2 Verify with Regex some words
#### 3.3 If are that words, put on Discord

# Baidu arhitecture
### 1. Download the website
### 2. Get all thread which contains (new chapter number) in title.
### 3. Put in a list to not ping the discord again.

# TO DO
#### Function for all crawlers to check if it's outdated.
#### Baidu crawler to follow a thread (check if it have new replies) (with commands, not follow all threads from Baidu Crawler list, lol)


# List with future Crawlers:
#### Maybe a crawler on Google Images
