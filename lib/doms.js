'use strict';

const path = require('path'),
  config  = require('./config'),
  json = require('./json'),
  reply = require('./reply');

const log = s => console.log(s);

/** mDoms
 *  domain configuration lookup req.dom
 *  eto look up domain configuration for each request
 */
var mDoms; // = new Map();

exports.initialize = fn => {
  return new Promise((resolve, reject) => {
    json.get(`/accts/${config.FID}/${fn}`)
      .then((itt) => {
        var dflt = itt.default;
        mDoms = itt;
        log(`- localhosting for fid ${config.FID} on aid ${mDoms.localhost.aid} with vid ${mDoms.localhost.vid}.`);
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

function get(host) {
  var dflt = mDoms._default,
    dom = mDoms[host];
  for (let p in dflt) {
    if (!dom[p])
      dom[p] = dflt[p];
  }
  return dom;
}
exports.get = get;

function set(host, dom) {
  mDoms[host] = dom;
}

exports.confirm = (req, res, next) => {
  req.dirs = path.dirname(req.path);
  req.extn = path.extname(req.path);
  req.base = path.basename(req.path, req.extn);
  var dom = get(req.hostname);
  if (dom) {
    req.dom = dom;
    if (dom.active)
     next();
    else
      reply.deny(req, res, 'Domain not Active');
  } else
    reply.put(req, res, 403, 'Domain not supported: ' + req.hostname);
}

exports.localize = host => {
  var dom = get(host);
  if (dom) {
    set('localhost', dom);
    return `Localhosting aid ${dom.aid} with vid ${dom.vid}.`;
  } else
    return "Hostname not configured.";
}
