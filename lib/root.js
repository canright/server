'use strict';

const reply = require('./reply'),
  db   = require('./db'),
  file = require('./file'),
  path = require('path'),
  htm  = require('./htm'),
  hmd  = require('./hmd'),
  hog  = require('./hog');

const indexers = ["default.htm", "index.htm", "index.hmd", "index.html", "/default.hmd", "/default.htm"];


function bub(req, res, iTry) {
  if (iTry < indexers.length) {
    let fn = indexers[iTry].split('.');
    let sDirs = fn[0][0]==='/' ? '/' : req.path;
    switch (fn[1]) {
      case 'hmd':
        hmd.get(req.dom, sDirs, fn[0])
        .then (dta => hog.respond(req, res, 200, dta))
        .catch(()  => bub(req, res, iTry + 1));
        break;
      case 'htm':
        htm.get(req.dom, sDirs, fn[0])
        .then (dta => hog.respond(req, res, 200, dta))
        .catch(e  => bub(req, res, iTry + 1));
        break;
      case 'html':
        file.get(file.index(req.dom, path.join(sDirs, indexers[iTry])))
        .then(dta => reply.send(req, res, dta))
        .catch(() => bub(req, res, iTry + 1));
        break;
      default:
        reply.deny(req, res, 'Type ' + fn[1] + ' root resource not supported: ' + req.path);
    }
  } else
    reply.pnf(req, res, 'Index not found', req.path);
}

exports.bubble = (req, res) => {bub(req, res, 0)};
