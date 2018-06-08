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

let db = admin.database();
let hankkijatRef = db.ref('hankkijat')
let aliases = [];
let ids = [];
hankkijatRef.on('value', function(snapshot) {
  aliases = [];
  ids = [];
  snapshot.forEach(function(childSnapshot) {
    let id = childSnapshot.child('id').val();
    childSnapshot.child('aliakset').forEach(function(childChildSnapshot){
      aliases.push(childChildSnapshot.val());
      ids.push(id);
    });
  });
  log.debug('Aliases updated');
});
let firebase = {
  getAll: function(){
    hankkijatRef.on('value', function(snapshot) {
      log.debug(snapshot.val());
    });
  },
  getAliases: function(){
    log.debug(aliases.length);
  }
};
module.exports = firebase;