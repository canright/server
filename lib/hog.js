'use strict';

const path = require('path'),
  hogan = require('hogan.js'),
  file = require('./file'),
  reply = require('./reply');

var mSkin = new Map(); // skin mapped cache

const del = (skinIdx) => mSkin.delete(skinIdx);
exports.remove = (aid, vid, skinKey) => del([aid, vid, skinKey].join('|'));

function skin(aid, vid, skinKey) {
  return new Promise((resolve, reject) => {
    let skinIdx = [aid, vid, skinKey].join('|');
    if (mSkin.has(skinIdx))
      resolve(mSkin.get(skinIdx));
    else {
      let hogFn = file.index(aid, vid, path.join(skinKey + '.hog'));
      file.readFile(hogFn)
        .then((hog) => {
          let skn = hogan.compile(hog);
          if (skn) {
            mSkin.set(skinIdx, skn);
            resolve(mSkin.get(skinIdx));
          } else
            reject('Failed to compile skin from hogan template: ' + skinKey);
        })
        .catch((err) => {
          reject('Failed to get skin ' + skinKey + ': ' + err);
        });
    }
  });
}
exports.skin = skin;


function render(aid, vid, dta) {
  return new Promise((resolve, reject) => {
    skin(aid, vid, dta.skin)
      .then((skn) => {
        let html = skn.render(dta);
        if (html)
          resolve(html);
        else
          reject('Hogan skin and htm context render nothing');
      })
      .catch(msg => reject(msg));
  })
}
exports.render = render;

exports.respond = (req, res, sta, dta) => {
  render(req.dom.aid, req.dom.vid, dta)
    .then((html) => {
      reply.put(req, res, sta, html);
    })
    .catch((msg) => {
      reply.pnf(req, res, msg, req.path);
    });
};
