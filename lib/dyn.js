'use strict';

const express = require('express'),
  config = require('./config'),
  reply = require('./reply'),
  hog = require('./hog'),
  htm = require('./htm'),
  hmd = require('./hmd');

const router = express.Router();

router.get(config.INTDTA_HTM, (req, res) =>
  htm.get(req.dom, req.dirs, req.base)
  .then (dta => hog.respond(req, res, 200, dta))
  .catch(err => reply.pnf(req, res, err, req.path))
);

router.get(config.INTDYN_HMD, (req, res) =>
  hmd.get(req.dom, req.dirs, req.base)
  .then(dta => hog.respond(req, res, 200, dta))
  .catch(err => reply.pnf(req, res, err, req.path))
);

module.exports = router;

/*
{
  "greet":"howdy!",
  "meta": {
    "error":{
      "errno":-2,
      "code":"ENOENT",
      "syscall":"open",
      "path":"/srv/server/v0.2/accts/reiken/stage/test.-md"
    }
  },
  "site":{
    "error":{
      "errno":-2,
      "code":"ENOENT",
      "syscall":"open",
      "path":"/srv/server/v0.2/accts/reiken/stage/site.hti"
    }
  },
  "menu":{
    "error":{
      "errno":-2,
      "code":"ENOENT",
      "syscall":"open",
      "path":"/srv/server/v0.2/accts/reiken/stage/menu.hti"
    }
  },
  "section":{
    "error":{
      "errno":-2,
      "code":"ENOENT",
      "syscall":"open",
      "path":"/srv/server/v0.2/accts/reiken/stage/section.hti"
    }
  },
  "skin":"hmd"
}
*/
