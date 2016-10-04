'use strict';

const marked = require('marked'),
  db   = require('./db'),
  file = require('./file');

const META = '-htm',
  HTI = 'hti',
  HTM = 'htm',
  SITE = 'site',
  MENU = 'menu',
  AREA = 'area',
  SECT = 'section';

function mmd(dom, dirs, base) {
  return new Promise(resolve => {
    file.readFile(file.index(dom, [dirs, [base, 'md'].join('.')].join("/")))
    .then(dta => resolve(dta))
    .catch(() => resolve(""));
  });
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

function sgmt(dom, dirs, base, xtn) {
  return new Promise(resolve => {
    db.fetch(dom, dirs, base, xtn)
    .then(dta => resolve(dta))
    .catch((e) => resolve({ error: e }));
  });
}

function sgmts(dom, dirs, base) {
  var a = dirs.split('/'),
    area = (a.length>2) ? a.slice(0,a.length-2).join('/') + '/' : '';

  return [
    sgmt(dom,   '', SITE, HTI),
    sgmt(dom,   '', MENU, HTI),
    sgmt(dom, area, AREA, HTI),
    sgmt(dom, dirs, SECT, HTI),
    sgmt(dom, dirs, base, META),
    mmd (dom, dirs, base)
  ];
}
exports.sgmts = sgmts;

function get(dom, dirs, base) {
  return new Promise((resolve, reject) => {
    db.fetch(dom, dirs, base, HTM)
    .then((cxt) => {
      var ps = sgmts(dom, dirs, base);
      Promise.all(ps)
      .then(a => {
        cxt.site    = a[0];
        cxt.menu    = a[1];
        cxt.area    = a[2];
        cxt.section = a[3];
        cxt.meta    = a[4];
        cxt.md      = marked(a[5]);
        cxt.mds     = a[5].split('\f').map(s => marked(s));
        cxt.skin = cxt._skin || cxt.meta._skin || cxt.section._skin || cxt.area._skin || cxt.site._skin || 'htm';
        if (!cxt.selected && cxt.area.selected) cxt.selected = cxt.area.selected;
        resolve(cxt);
      })
      .catch(e => reject(e));
    })
    .catch(e => {
      if (e.code!=='ENOENT')
        console.log('htm.get Error:', e)
      return reject(e);
    });
  });
}
exports.get = get;
