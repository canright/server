'use strict';

const db = require('./db'),
  file = require('./file');

const META = '-htm',
  HTI = 'hti',
  HTM = 'htm',
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
    db.fetch(dom, dirs, base, 'htm')
    .then((cxt) => {
      var ps = sgmts(dom, dirs);
      ps.unshift(meta(dom, dirs, base));
      Promise.all(ps)
      .then(a => {
        cxt.meta = a[0];
        cxt.site = a[1];
        cxt.menu = a[2];
        cxt.section = a[3];
        cxt.skin = cxt._skin || cxt.meta._skin || cxt.section._skin || cxt.site._skin || HTM;
        resolve(cxt);
      })
      .catch(e => reject(e));
    })
    .catch(e => reject(e));
  });
}
exports.get = get;
