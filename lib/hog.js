'use strict';

const path = require('path'),
  hogan = require('hogan.js'),
  file = require('./file'),
  reply = require('./reply');

const SKINS = '_skins',
      HOG   = '.hog';

var mSkin = new Map();
var mHead = new Map();
var mFoot = new Map();

const del = (skinIdx) => mSkin.delete(skinIdx);
exports.remove = (dom, skinKey) => del([dom.aid, dom.vid, skinKey].join('|'));

const skinpath = (dom, fn) => file.index(dom, path.join(SKINS, fn + HOG));

function getHead(dom) {
  return new Promise(resolve => {
    var key = '_head',
        idx = [dom.aid, dom.vid, key].join('|');
    if (!mHead.has(idx)) {
      file.readFile(skinpath(dom, key))
      .then (head => {
        mHead.set(idx, head);
        resolve(head);
      })
      .catch(err => {
        console.log('getHead Failed:', err)
        mHead.set(idx, '');
        resolve('');
      });
    } else
      resolve(mHead.get(idx));
  })
}

function getFoot(dom) {
  return new Promise(resolve => {
    var key = '_foot',
        idx = [dom.aid, dom.vid, key].join('|');
    if (!mFoot.has(idx)) {
      file.readFile(skinpath(dom, key))
      .then (foot => {
        mFoot.set(idx, foot);
        resolve(foot);
      })
      .catch(err => {
        console.log('getFoot Failed:', err)
        mFoot.set(idx, '');
        resolve('');
      });
    } else
      resolve(mFoot.get(idx));
  })
}


function skin(dom, skinKey) {
  return new Promise((resolve, reject) => {
    let skinIdx = [dom.aid, dom.vid, skinKey].join('|');
    if (mSkin.has(skinIdx))
      resolve(mSkin.get(skinIdx));
    else {
      var tmpl;
      file.readFile(skinpath(dom, skinKey))
      .then(hog => {
        tmpl = hog;
        return getHead(dom);
      })
      .then(hog => {
        tmpl = hog + tmpl;
        return getFoot(dom);
      })
      .then(hog => hogan.compile(tmpl + hog))
      .then(skn => {
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

function render(dom, dta) {
  return new Promise((resolve, reject) => {
    skin(dom, dta.skin)
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
  render(req.dom, dta)
  .then(html => reply.put(req, res, sta, html))
  .catch(msg => reply.pnf(req, res, msg, req.path));
};
