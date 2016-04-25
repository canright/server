'use strict';

const path = require('path'),
  json = require('./json'),
  reply = require('./reply');

const log = s => console.log(s);

/** mDoms
 *  domain configuration lookup req.dom
 *  eto look up domain configuration for each request
 */
var mDoms; // = new Map();

exports.initialize = (fn) => {
  return new Promise((resolve, reject) => {
    json.get(fn)
      .then((itt) => {
        mDoms = itt;
        log(`- localhosting: ${mDoms.localhost.aid} with ${mDoms.localhost.vid}.`);
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.confirm = (req, res, next) => {
  req.dirs = path.dirname(req.path);
  req.extn = path.extname(req.path);
  req.base = path.basename(req.path, req.extn);

  var dom = mDoms[req.hostname];
  if (dom) {
    req.dom = dom;
    if (dom.active)
     next();
    else
      reply.deny(req, res, 'Domain not Active');
  } else
    reply.put(req, res, 403, 'Domain not supported.');
}
