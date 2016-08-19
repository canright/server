"use strict";

const express = require('express'),
  path = require('path'),
  config = require('./config'),
  file = require('./file'),
  reply = require('./reply'),
  db = require('./db');

const router = express.Router();

router.get('/inspect', (req, res) => {
  var dir  = '../../',
      root = path.join('accts', req.dom.aid, req.dom.vid),
      fold = path.join('accts', req.dom.aid, req.dom.vid, dir);
  if (fold.indexOf(root) !== 0)
    fold = root;

  file.readDir(fold)
  .then(fils => {
    reply.send(req, res, JSON.stringify({
      dir: dir,
      subs:  fils.filter(fil =>  fil.dir).map(fil=>fil.fn),
      files: fils.filter(fil => !fil.dir).map(fil=>fil.fn)
    }))
  });
});

router.get(config.PUBSTA, (req, res) => { file.send(req, res) });

router.get(config.PUBDTA, (req, res) => {
  db.fetch(req.dom.site.db, req.dirs, req.base, req.extn)
    .then((data) => { reply.send(req, res, data) })
    .catch((msg) => {
      console.log('PNF pub:dta!');
      reply.pnf(req, res, msg, req.path)
    });
});

module.exports = router;
