'use strict';

const hog = require('./hog');
const hmd = require('./hmd');

const log  = s => console.log(s);
const put  = (req, res, iSta, sStuff) => res.status(iSta).send(sStuff);
const send = (req, res,       sStuff) => put(req, res, 200, sStuff);

function say(req, res, ski, sta, titleA, titleB, msg, rsr) {
  var aid = req.dom.aid;
  var vid = req.dom.vid;
  Promise.all(hmd.sgmts(req.dom.db, aid, vid, req.dirs))
  .then((segs) => {
    console.log('Got segments');
    var cxt = {
      status: sta,
      titleA: titleA,
      titleB: titleB,
      message: msg,
      resource: rsr||'',
      req: req,
      skin: ski,
      site: segs[0],
      menu: segs[1],
      section: segs[2]
    }

    hog.skin(aid, vid, ski)
      .then((skin) => {
        let html = skin.render(cxt);
        if (html)
          put(req, res, sta, html);
        else
          shut(req, res, 'Invisible skin ' + skin);
      })
      .catch( e => {
        console.log('I couldnt say: %s', e);
        shut(req, res, e);
      });
  })
  .catch(e => {
    console.log('Bad segments', e);
    shut(req, res, e);
  })
}

function shut(req, res, msg) {
  log(`Reply.shut ${msg}.`);
  say(req, res, 'say', 403, 'ACCESS', 'DENIED', msg, req.path);
  res.status(403).send([msg, req.path].join('<br>\n'));
}

exports.put  = put;
exports.send = send;
exports.say  = say;
exports.shut = shut;
exports.deny = (req, res, sMsg)       => say(req, res, 'say', 403, 'Access', 'Denied', sMsg, req.path);
exports.pnf  = (req, res, sMsg, sRes) => say(req, res, 'say', 404, 'Resource', 'Not Found', sMsg, sRes);
