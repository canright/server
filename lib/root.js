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
        hmd.get(req.dom.db, req.dom.aid, req.dom.vid, sDirs, fn[0])
        .then (dta => hog.respond(req, res, 200, dta))
        .catch(()  => bub(req, res, iTry + 1));
        break;
      case 'htm':
        db.fetch(req.dom.db, req.dom.aid, req.dom.vid, sDirs, fn[0], fn[1])
        .then (dta => hog.respond(req, res, 200, dta))
        .catch(()  => bub(req, res, iTry + 1));
        break;
      case 'html':
        file.get(file.index(req.dom.aid, req.dom.vid, path.join(sDirs, indexers[iTry])))
        .then(dta => {
          console.log('got html!');
          reply.send(req, res, dta);
        })
        .catch(() => {
          console.log('not html!');
          bub(req, res, iTry + 1);
        });
        console.log('tried html?');
        break;
      default:
        console.log('try wtf!');
        reply.deny(req, res, 'Type ' + fn[1] + ' root resource not supported: ' + req.path);
    }
  } else reply.pnf(req, res, 'Index not found', req.path);
}

exports.bubble = (req, res) => {bub(req, res, 0)};
