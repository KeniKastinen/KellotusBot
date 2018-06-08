/*
    KellotusBot, a Telegram bot to filter Kellotus results from group chat and push them to Firebase
    Copyright (C) 2018  Keni Kastinen
*/

/*
    firebase.js
    All firebase interaction.
*/

'use strict';

var admin = require('firebase-admin');
const log = require('loglevel');
log.setLevel(logLevel);
