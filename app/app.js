/*
    KellotusBot, a Telegram bot to filter Kellotus results from group chat and push them to Firebase
    Copyright (C) 2018  Keni Kastinen
*/

/*
    app.js
    Message hansling.
*/
'use strict';

module.exports = function(bot) {
  
  const TARGET_CHAT_ID = process.env.TARGET_CHAT_ID;
  const log = require('loglevel');
  log.setLevel(logLevel);
  

  bot.on("text", (message) => {
    parseResults(message.text);

    function parseResults(messageText) {
      let lines = messageText.split(/\r?\n/); //Split on newline
      let results = [];
      //add lines with number and w/o "-character on start to results array
      for (var i = 1; i < lines.length; i++) {
        if (lines[i].match(new RegExp("\\d")) != null && !lines[i].startsWith("\"")){
          results.push(lines[i]); 
        }
      }
      log.debug(results);
      bot.sendMessage(TARGET_CHAT_ID, results.join("\n"));
      
      //return 
    }
  });
}
