'use strict';

const express = require('express'),
  reply = require('./reply'),
  config = require('./config'),
  db = require('./db');

const router = express.Router();

router.get('/' + config.LOOK + '*', (req, res) => {
  db.fetch(dom, req.dirs, req.base, req.extn)
    .then(data => reply.send(req, res, data))
    .catch(err => reply.pnf(req, res, err, req.path));
});
module.exports = router;
