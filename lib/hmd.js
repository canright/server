'use strict';

const db = require('./db'),
  file = require('./file');

const META = '-md',
  HTI = 'hti',
  HMD = 'hmd',
  SITE = 'site',
  MENU = 'menu',
  SECT = 'section';

function mmd(dom, dirs, base) {
  return file.readFile(file.index(dom, [dirs, [base, 'md'].join('.')].join("/")));
}

function data(dom, dirs, base) {
  return new Promise(resolve => {
    db.fetch(dom, dirs, base, HTI)
      .then(dta => resolve(dta))
      .catch(() =>
        db.fetch(dom, dirs, HMD, HTI)
          .then(dtb => resolve(dtb))
          .catch(() =>
            db.fetch(dom, '', HMD, HTI)
              .then(dtc => resolve(dtc))
              .catch(errC => resolve({ error: errC }))
          )
      );
  });
}

function meta(dom, dirs, base) {
  return new Promise(resolve => {
    db.fetch(dom, dirs, base, META)
      .then(dta => resolve(dta))
      .catch((e) => resolve({ error: e }));
  });
}

function sgmt(dom, dirs, base, xtn) {
  return new Promise(resolve => {
    db.fetch(dom, dirs, base, xtn)
      .then(dta => resolve(dta))
      .catch((e) => resolve({ error: e }));
  });
}

function sgmts(dom, dirs) {
  return [
    sgmt(dom,   '', SITE, HTI),
    sgmt(dom,   '', MENU, HTI),
    sgmt(dom, dirs, SECT, HTI)
  ];
}
exports.sgmts = sgmts;

function get(dom, dirs, base) {
  return new Promise((resolve, reject) => {
    mmd(dom, dirs, base)
      .then((md) => {
        var ps = sgmts(dom, dirs);
        ps.unshift(
          data(dom, dirs, base),
          meta(dom, dirs, base)
        );
        Promise.all(ps)
          .then(a => {
            var cxt = a[0];
            cxt.meta = a[1];
            cxt.site = a[2];
            cxt.menu = a[3];
            cxt.section = a[4];
            cxt.text = md;
            cxt.skin = cxt.skin || cxt.meta.skin || cxt.section.skin || HMD;
            resolve(cxt);
          })
          .catch(e => reject(e));
      })
      .catch(e => reject(e));
  });
}
exports.get = get;
