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
var serviceAccount = require('./firebase-adminsdk-co6se-25f19c0836.json');
const log = require('loglevel');
log.setLevel(logLevel);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_URL
});