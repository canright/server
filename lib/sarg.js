'use strict';

const config = require('./config'),
  reply = require('./reply');

const log = s => console.log(s);

exports.authorize = (req, res, next) => {
  var bAuth = true;

  if (bAuth) {
    next();
  } else {
    log('sarg.authorize on ${config.FID}:${req.dom.aid} for ${req.path}.');
    reply.deny(req, res, 'Not authorized');
  }
}

process.on('unhandledRejection', function(error, promise) {
  console.error("ERROR TRAPPED", error.stack);
});

exports.zombies = (req, res, next) => {
  if (req.dom.active)
    next();
  else {
    log(`sarg.zombie on ${config.FID}:${req.dom.aid}/${req.dom.vid} for ${req.path}.`);
    reply.deny(req, res, 'Zombie domain not active');
  }
}

exports.unsupported = (req, res, next) => {
  var i = config.EXTS.indexOf(req.extn + '.');
  if (req.extn === "" || i >= 0) {
    next();
  } else
    reply.deny(req, res, 'Unsupported Request');
}
