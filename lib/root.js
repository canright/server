'use strict';

const reply = require('./reply'),
  db   = require('./db'),
  file = require('./file'),
  path = require('path'),
  hmd  = require('./hmd'),
  hog  = require('./hog');

const indexers = ["index.hmd", "index.htm", "index.html", "/default.hmd", "/default.htm"];


function bub(req, res, iTry) {
  
  if (iTry < indexers.length) {
    let fn = indexers[iTry].split('.');
    let sDirs = fn[0][0]==='/' ? '/' : req.path;
    switch (fn[1]) {
      case 'hmd':
        hmd.getHmd(req.dom.db, req.dom.aid, req.dom.vid, sDirs, fn[0])
        .then (dta => hog.respond(req, res, 200, dta))
        .catch(()  => bub(req, res, iTry + 1));
        break;
      case 'htm':
        hmd.getHtm(req.dom.db, req.dom.aid, req.dom.vid, sDirs, fn[0])
        .then (dta => hog.respond(req, res, 200, dta))
        .catch(()  => bub(req, res, iTry + 1));
        break;
      case 'html':
        file.get(file.index(req.dom.aid, req.dom.vid, path.join(sDirs, indexers[iTry])))
        .then(dta => reply.send(req, res, dta))
        .catch(() => bub(req, res, iTry + 1));
        break;
      default:
        reply.deny(req, res, 'Type ' + fn[1] + ' root resource not supported: ' + req.path);
    }
  } else reply.pnf(req, res, 'Index not found', req.path);
}

exports.bubble = (req, res) => {bub(req, res, 0)};
