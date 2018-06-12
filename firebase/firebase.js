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
let dbSnapshot = null;
hankkijatRef.on('value', function(snapshot) {
  dbSnapshot = snapshot;
  aliases = [];
  ids = [];
  snapshot.forEach(function(childSnapshot) {
    let id = childSnapshot.child('id').val();
    childSnapshot.child('aliakset').forEach(function(childChildSnapshot){
      aliases.push(childChildSnapshot.val());
      ids.push(id);
    });
  });
  //log.debug('Aliases updated');
});
let firebase = {
  getAll: function(){
    hankkijatRef.on('value', function(snapshot) {
      log.debug(snapshot.val());
    });
  },
  getAliases: function(){
    return aliases;
  },
  getIds: function(){
    return ids;
  },
  getName: function(getNameId){
    let hankkijaName = dbSnapshot.child(getNameId).child('hankkijaNimi').val();
    return hankkijaName;
  },
  writeResult: function(writeResultId, result, time){ //id, data
    let kellotusAmount = this.getKellotusAmount(writeResultId);
    let newResultRef = db.ref('hankkijat/' + writeResultId + '/kellotuksettg/'+kellotusAmount).set({ 
      tulos: 13
    });
      //var data = {"suorittaja":61, "tulos":3, "aika":1448902560000, "viesti":311, "ysiysi":false};
  },
  getKellotusAmount: function(getKellotusAmountId){
    let kellotusAmount = dbSnapshot.child(getKellotusAmountId).child('kellotuksettg').numChildren()
    log.debug(this.getName(getKellotusAmountId) + ' kellotukset: ' + kellotusAmount);
    return kellotusAmount;
  }
};
module.exports = firebase;