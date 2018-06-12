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
  const firebase = require('../firebase/firebase');
  const log = require('loglevel');
  log.setLevel(logLevel);
  
  bot.on("text", (message) => {
    parseResults(message);
  });
  function parseResults(message) {
    let lines = message.text.split(/\r?\n/); //Split on newline
    let results = [];
    //add lines with number and w/o "-character on start to results array
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].match(new RegExp("\\d")) != null && !lines[i].startsWith("\"")){
        parseLine(lines[i], message);
      }
    }
    //bot.sendMessage(TARGET_CHAT_ID, results.join("\n"));
    //firebase.getAliases();
  };
  function parseLine(line, message){
    let wordArray = line.split(new RegExp("\\s"));//Whitespace characters
    
    let regex = new RegExp("\\d|\\d{2}|\\d\\S|\\d{2}\\S");//number or 2 numbers or some character after them
    let lineWords = 4;
    if (wordArray.length <4) lineWords = wordArray.length;
    for (let i = 1; i<=lineWords; i++) {
      if (wordArray[i-1].match(regex)){
        let aliasString = wordArray.slice(0,i-1).join(" ")
        let tempId = getAliasId(aliasString);
        log.debug('id: ' + tempId);
        log.debug(firebase.getName(tempId));
        log.debug(message);
        //firebase.writeResult(tempId);
        
      }
    }
    
  };
  function getAliasId(alias){
    let palautus = -1;
    let aliases = firebase.getAliases();
    for (let i = 0; i < aliases.length; i++) {
      if(aliases[i].toLowerCase() === alias.toLowerCase()){
        palautus = firebase.getIds()[i];
      }
    }
    return palautus;
  };
  
}
