'use strict';

const db = require('./db'),
  file = require('./file');

const META = '-md',
      HTI  = 'hti',
      HMD  = 'hmd',
      SITE = 'site',
      MENU = 'menu',
      SECT = 'section';

function mmd(aid, vid, dirs, base) {
  return file.readFile(file.index(aid, vid, [dirs, [base, 'md'].join('.')].join("/")));
}

function data(dbi, aid, vid, dirs, base) {
  return new Promise (resolve => {
    db.fetch(dbi, aid, vid, dirs, base, HTI)
    .then(dta => resolve(dta))
    .catch(() =>
      db.fetch(dbi, aid, vid, dirs, HMD, HTI)
      .then(dtb => resolve(dtb))
      .catch(() => 
        db.fetch(dbi, aid, vid, '', HMD, HTI)
        .then(dtc => resolve(dtc))
        .catch(errC => resolve({error: errC}))
      )
    );
  });
}

function meta(dbi, aid, vid, dirs, base) {
  return new Promise (resolve => {
    db.fetch(dbi, aid, vid, dirs, base, META)
      .then(dta => resolve(dta))
      .catch((e) => resolve({error: e}));
  });
}

function sgmt(dbi, aid, vid, dirs, base, xtn) {
  return new Promise (resolve => {
    db.fetch(dbi, aid, vid, dirs, base, xtn)
      .then (dta => resolve(dta))
      .catch((e) => resolve({error: e}));
  });
}

function sgmts(dbi, aid, vid) {
  return [
    sgmt(dbi, aid, vid, '', SITE, HTI),
    sgmt(dbi, aid, vid, '', MENU, HTI),
    sgmt(dbi, aid, vid, '', SECT, HTI)
  ];
}
exports.sgmts = sgmts;

function get(dbi, aid, vid, dirs, base) {
  return new Promise ((resolve, reject) => {
    mmd(aid, vid, dirs, base)
    .then((md) => {
      var ps = sgmts(dbi, aid, vid);
      ps.unshift(
        data(dbi, aid, vid, dirs, base),
        meta(dbi, aid, vid, dirs, base)
      );
      Promise.all(ps)
      .then( a => {
        var cxt  = a[0];
        cxt.meta = a[1];
        cxt.site = a[2];
        cxt.menu = a[3];
        cxt.section = a[4];
        cxt.text   = md;
        cxt.skin = cxt.skin || cxt.meta.skin || cxt.section.skin || HMD; // from foo.hti, foo.-md, section.hti, hmd.hti
        resolve(cxt);
      })
      .catch(e => reject(e));
    })
    .catch(e => reject(e));
  });
}
exports.get = get;
