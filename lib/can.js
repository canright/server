'use strict';

const express = require('express'),
  path = require('path'),
  config = require('./config'),
  file = require('./file'),
  reply = require('./reply');

const router = express.Router();

function ls(dom, dir) {
  var root = path.join('accts', config.FID, dom.aid, dom.vid),
      fold = path.join(root, dir);
  if (fold.indexOf(root) !== 0)
    fold = root;

  return file.readDir(fold)
  .then(fils => ({ 
      dir: dir,
      subs:  fils.filter(fil =>  fil.dir).map(fil=>fil.fn),
      files: fils.filter(fil => !fil.dir).map(fil=>fil.fn)
  }));
}

/*
router.get('/can', (req, res) => {
  ls(req.dom, '/')
  .then(o => reply.send(req, res, JSON.stringify(o)));
});
*/

router.get('/can/*.(html|css|js|txt|xml|md|jpeg|jpg|gif|png|pdf|ico)', (req, res) => file.sendFile(req, res, req.path));

router.get('/can', (req, res) => {
  var fn = '/can/index.html';
  
  file.readFile(fn)
  .then(blob => reply.send(req, res, blob))
  .catch(err => reply.pnf(req, res,err, fn));
});

/*
router.get('/login', (req, res) => {
  reply.send(req, res, 'hello!');
});
*/

module.exports = router;
