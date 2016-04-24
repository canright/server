"use strict";

const noMon = "MongoDb is not yet installed";

function mongoDbFetch(col, key) {
  return new Promise((resolve, reject) => {
    console.log(noMon);
    console.log("Collection: %s!", col);
    console.log("Key: %s!", key);
    reject(noMon);
  });
}

exports.fetch = (aid, vid, set, key) => mongoDbFetch([aid, vid, set].join("|"), key);
