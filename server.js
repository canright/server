'use strict';

const app = require('express')();

const morgan = require('morgan'),
  parser  = require('body-parser'),
  cookies = require('cookie-parser'),
  favicon = require('serve-favicon'),
  path    = require('path'),
  config  = require('./lib/config'),
  doms    = require('./lib/doms'),
  sarg    = require('./lib/sarg'),
  look    = require('./lib/look'),
  tbx     = require('./lib/tbx'),
  pub     = require('./lib/pub'),
  dyn     = require('./lib/dyn'),
  root    = require('./lib/root'),
  cli     = require('./lib/cli'),
//pinger  = require('./lib/pinger'),
  pkg     = require('./package.json');

const log = s => console.log(s),
  logto   = cli.log,
  LOGGER  = `${config.FID} :aid :vid :dat :status :method :remote-addr :host :url`,
  ok      = (res, title, body) => out.reply(res, out.htmlPage(title, body));

(() => {
  log(`- ${new Date().toLocaleString()}.`);
  log(`- node ${process.version}.`);
  log(`- server v${pkg.version}.`);
  app.set('env', 'development');
  global.appRoot = path.resolve(__dirname);
  return doms.initialize(config.DOMAINS);
})().then(() => {
  app.use(parser.json());
  app.use(parser.urlencoded({ extended: false }));
  app.use(cookies());
  app.use(doms.confirm);     // init req.dom
  morgan.token('aid',  function(req) {return req.dom.aid});
  morgan.token('vid',  function(req) {return req.dom.vid});
  morgan.token('host', function(req) {return req.hostname});
  morgan.token('path', function(req) {return req.path});
  var pad = (k) => (k<10) ? '0' + k : '' + k;
  morgan.token('dat', function(req) {
    var d = new Date();
    return `${d.getFullYear(d)%100}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  })
  app.use(morgan(LOGGER, {stream: logto}));

  app.get('/now', (req, res) => ok(res, 'Now', new Date()));

//app.use(dns);

//app.use(favicon(path.join(__dirname, "/publidata/nice/s0-0/favicon.ico")));

  app.use(sarg.zombies);     // 403 deny dead site
  app.use(look);             // json for key in /look/
  app.use(tbx);              // command toolbox from /tbx/
  app.use(sarg.unsupported); // 403 deny unknown exts
  app.use(pub);              // public resources
  app.use(dyn);              // dynamic resources
  app.use(root.bubble);      // root folder request

  log(`- Serving Franchise ${config.FID}: HTTP at localhost:${config.PORT}\n`);
  app.listen(config.PORT);
}).catch((err) => log(`- aborted: ${err}.`));

module.exports = app;
