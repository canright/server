'use strict';

const reply = require('./reply'),
  hmd = require('./hmd'),
  hog = require('./hog');

const indexers = ["index.hmd", "index.htm", "index.html", "/default.hmd", "/default.htm"];


function bub(req, res, iTry) {
  var hogout = (sDirs, fnHtm, md, meta) => {
    hog.render(req.dom.db, req.dom.aid, req.dom.vid, sDirs, fnHtm, md, meta)
    .then((sHtml) => {reply.send(req, res, sHtml)})
    .catch(() => {bub(req, res, iTry + 1)});
  }
  if (iTry < indexers.length) {
    let fn = indexers[iTry].split('.'),
      sDirs = fn[0][0]==='/' ? '/' : req.path;
    switch (fn[1]) {
      case 'htm':
        hogout(sDirs, fn[0], null, null);
        break;
      case 'hmd':
        hmd.get(req.dom.db, req.dom.aid, req.dom.vid, sDirs, "index")
        .then (dta => hog.respond(req, res, 200, dta))
        .catch(err => reply.pnf(req, res, err, req.path));
        break;
      default:
        reply.deny(req, res, 'Type ' + fn[1] + ' root resource not supported: ' + req.path);
    }
  } else reply.pnf(req, res, 'Index not found', req.path);
}

exports.bubble = (req, res) => {bub(req, res, 0)};
