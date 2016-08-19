'use strict';

const file = require('./file');

function get(sFull) {
  console.log('json.get: ' + sFull);
  return new Promise((resolve, reject) => {
    file.readFile(sFull)
      .then((data) => {
        try {
          var datum = JSON.parse(data);
        }
        catch (e) {
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

exports.fetch = (dom, pat) => get(file.index(dom, pat));
exports.post  = (dom, pat, data) => file.writeFile(file.index(dom, pat), JSON.stringify(data));
