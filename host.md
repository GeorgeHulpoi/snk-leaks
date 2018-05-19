# Tutorial for hosting

### Install the programs

You will need to install [NodeJS](https://nodejs.org/en/) and [Microsoft Build Tools 2015](https://www.microsoft.com/en-us/download/details.aspx?id=48159)

### First you need to create the bot on Discord
https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token

Remember to get the token, you need it.

### Download the bot source.
![img1](https://i.imgur.com/Bh2K3Zm.png)

### Install bot resources.

First you will need to open the **Command Prompt**, you can using **Window + R**, writing **cmd** and press **Enter** or search in Start **cmd** and open it.
After you do it, you will see this:

![img2](https://i.imgur.com/YAYv2Nf.png)

To be sure that NodeJS work, type in cmd: **node -v** and press **Enter** and after that **npm -v** and press **Enter**

![img3](https://i.imgur.com/pokzNYV.png)

Now you are ready to go, you need to enter with CMD in the bot folder, let's say your source is in **C:\Projects\snk-leaks**
You need to type in CMD this: **cd C:\Projects\snk-leaks** and press **Enter**

The last step is to type: **npm i** and press **Enter**
You will have to wait, I don't know how longer. At the end you will see something like this:

![img4](https://i.imgur.com/1Yf7z6j.png)

After that, you will see in your folder a new folder named **node_modules**.

### Create a config.json

Put that source in a folder, and in that folder, where are **package.json** and **other files**, create a new file "**config.json**", use Notepad to edit it.
In file you will put this: 
```
{
   "token": "your_token_code"
}
```

Replace **your_token_code** with what you got from **Discord**.
#### The code must be in quotes.
#### If you don't know to create a .json file, check [this](https://www.mediacollege.com/microsoft/windows/extension-change.html)

### Configuring the Discord server

The first step is to create a server and invite the bot. After this, you need to create a role named **Admin**, the bot will respond only if you have this role.

### Start the bot

With CMD (it can be another CMD, doesn't matter) enter in bot folder with cd and type: **cd dist** and press **Enter**, **node main.js** and press **Enter**.

![img5](https://i.imgur.com/paDkcEW.png)

Now you are ready to go!
