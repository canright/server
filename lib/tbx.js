'use strict';

const express = require('express'),
  reply = require('./reply'),
  config = require('./config'),
  db = require('./db');

const router = express.Router();

router.get('/' + config.TBX + '/*', (req, res) => {
  db.fetch(req.dom, req.dirs, req.base, req.extn)
    .then((data) => { reply.send(req, res, data); })
    .catch((err) => {
      console.log('PNF tbx!');
      reply.pnf(req, res, err, req.path)
    });
});
module.exports = router;
