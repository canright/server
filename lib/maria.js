'use strict';

const noMar = 'MariaDb is not yet installed';

function mariaDbFetch(sTbl, sKey) {
  return new Promise((resolve, reject) => {
    console.log(noMar);
    console.log('Table: %s!', sTbl);
    console.log('Key: %s!', sKey);
    reject(noMar);
  });
}

function fetch(sAid, sVid, sSet, sKey) {
  return new Promise((resolve, reject) => {
    mariaDbFetch([sAid, sVid, sSet].join('_'), sKey)
      .then((data) => { resolve(data) })
      .catch((msg) => { reject(msg) });
  });
}
exports.fetch = fetch;
