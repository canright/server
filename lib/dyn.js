'use strict';

const express = require('express'),
  config = require('./config'),
  reply  = require('./reply'),
  hog    = require('./hog'),
  hmd    = require('./hmd');

const router = express.Router();

router.get(config.INTDTA_HTM, (req, res) => hog.respond(req, res, 200, req.base, null));

router.get(config.INTDYN_HMD, (req, res) => 
  hmd.get(req.dom.db, req.dom.aid, req.dom.vid, req.dirs, req.base)
  .then (dta => hog.respond(req, res, 200, dta))
  .catch(err => reply.pnf(req, res, err, req.path))
);

module.exports = router;
