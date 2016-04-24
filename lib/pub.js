"use strict";

const express = require('express'),
  config = require('./config'),
  file = require('./file'),
  reply = require('./reply'),
  db = require('./db');

const router = express.Router();

router.get(config.PUBSTA, (req, res) => { file.send(req, res) });

router.get(config.PUBDTA, (req, res) => {
  db.fetch(req.dom.site.db, req.dirs, req.base, req.extn)
    .then((data) => { reply.send(req, res, data) })
    .catch((msg) => { reply.pnf(req, res, msg, req.path) });
});

module.exports = router;
