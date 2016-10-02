'use strict';

const hog = require('./hog');
const hmd = require('./hmd');

const log = s => console.log(s);
const put = (req, res, iSta, sStuff) => res.status(iSta).send(sStuff);
const send = (req, res, sStuff) => put(req, res, 200, sStuff);

function shut(req, res, msg, rsr, err) {
  log('SHUT MSG: ' + msg);
  log('> SHUT RSR: ' + rsr);
  log('> SHUT ERR: ' + err);
  res.status(403).send([msg, rsr, err, req.path].join('<br>\n'));
}

function say(req, res, ski, sta, titleA, titleB, msg, rsr) {
  Promise.all(hmd.sgmts(req.dom, req.dirs))
    .then((segs) => {
      var cxt = {
        status: sta,
        titleA: titleA,
        titleB: titleB,
        message: msg,
        resource: rsr || '',
        req: req,
        skin: ski,
        site: segs[0],
        menu: segs[1],
        section: segs[2]
      }

      hog.skin(req.dom, ski)
        .then((skin) => {
          let html = skin.render(cxt);
          if (html)
            put(req, res, sta, html);
          else
            shut(req, res, msg, rsr, 'Invisible skin ' + skin);
        })
        .catch(e => shut(req, res, msg, rsr, e));
    })
    .catch(e => shut(req, res, msg, rsr, e));
}

exports.put = put;
exports.send = send;
exports.say = say;
exports.deny = (req, res, sMsg) => say(req, res, 'say', 403, 'Access', 'Denied', sMsg, req.path);
exports.pnf = (req, res, sMsg, sRes) =>  say(req, res, 'say', 404, 'Resource', 'Not Found', sMsg, sRes);