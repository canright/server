'use strict';

const file = require('./file');

function get(sFull) {
  return new Promise ((resolve, reject) => {
    file.readFile(sFull)
      .then((data) => {
        try {
          var datum = JSON.parse(data);
        }
        catch (e) {
          console.log('JSON parse error on %s: %s', sFull, e);
          reject(e);
        }
        resolve(datum);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
exports.get = get;

exports.fetch = (aid, vid, pat)       => get(file.index(aid, vid, pat));
exports.post  = (aid, vid, pat, data) => file.writeFile(file.index(aid, vid, pat), JSON.stringify(data));
