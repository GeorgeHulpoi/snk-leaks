import { Bot } from "./bot";

process.on('uncaughtException', function (err) 
{
    console.log('Caught exception: ', err);
});
  
Bot.start();
