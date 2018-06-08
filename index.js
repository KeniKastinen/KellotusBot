/*
    KellotusBot, a Telegram bot to filter Kellotus results from group chat and push them to Firebase
    Copyright (C) 2018  Keni Kastinen
*/

/*
    index.js
    Main entrypoint, initialize tg-bot.
*/

'use strict';
const TOKEN = process.env.TOKEN;
const TelegramBot = require('node-telegram-bot-api');
const log = require('loglevel');
if (process.env.NODE_ENV === 'dev'){
  global.logLevel = 1
} else {
  global.logLevel = 3
}
log.setLevel(logLevel); // trace = 0', debug = 1, info = 2, warn = 3 (default), error = 4, silent = 5

let bot = new TelegramBot(TOKEN, { polling: true });
log.info('KellotusBot started')

// Load app
require('./app/app.js')(bot);






