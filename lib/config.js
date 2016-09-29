'use strict';
exports.PUBSTA_CODE = '/*.(html|css|js)';
exports.PUBSTA_BLOB = '/*.(jpeg|jpg|gif|png|pdf|ico)';
exports.PUBSTA_TEXT = '/*.(txt|xml)';
exports.PUBSTA_MD = '/*.md';
exports.PUBDTA_META = '/*.(-md|-htm|-hog|-styl)';
exports.PUBDTA_JSON = '/*.json';
exports.INTCOD_HOG = '/*.hog';
exports.INTCOD_STYL = '/*.less';
exports.INTDTA_HTM = '/*.htm';
exports.INTDTA_HTI = '/*.hti';
exports.INTDYN_HMD = '/*.hmd';
exports.MOUNT = 'accts';
exports.PUBSTA = '/*.(html|css|js|txt|xml|md|jpeg|jpg|gif|png|pdf|ico)';
exports.PUBDTA = '/*.(json|-md|-htm|-hog|-less|-js|-json||hti)';
exports.EXTS = '.html.css.js' +
  '.jpeg.jpg.gif.png.pdf.ico' +
  '.txt.xml' +
  '.md' +
  '.json' +
  '.-md.-htm.-js.-hog.-less' +
  '.htm' +
  '.hmd.';
exports.TBX = 'tbx';
exports.LOOK = 'look';
exports.HOGAN = 'hogan';
exports.DOMAINS = 'domains.json';     // domain configuration.
exports.PORT = process.env.PORT || 3000;

exports.FID = process.argv.length > 2 ? process.argv[2] : 'canright';

//exports.PUBDTA_LOOK = PUBDTA_LOOK;
