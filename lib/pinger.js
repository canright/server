"use strict";

const request = require('request');
const sendmail = require('sendmail')();
const who = 'jim@canright.net',
  sndr = 'no-reply@canright.net',
  pings = [
    {
      url: 'http://webtools.canright.com/tbx/wck.asp',
      lag: 60000,
      sta: 200,
      see: '\nOK\n'
    }
  ];

function alerter(sbj, msg) {
  sendmail({
    from: sndr,
    to: who,
    subject: sbj,
    content: msg,
  }, function(err, reply) {
    if (err)
      console.log('SENDMAIL ERR: %s.', err);
    else
      console.log(reply);
  });
}

function ping(p) {
  request(p.url, function(err, rsp, bod) {
    if (err)
      alerter('PING ERROR', err);
    else if (rsp.statusCode !== p.sta)
      alerter('PING STATUS ERROR', rsp.statusCode);
    else if (bod.indexOf(p.see) < 0)
      alerter('PING RESPONSE ERROR', bod);
    else
      alerter('PING OK', bod);
      
    setTimeout(function(){ping()}, p.lag);
  })
}
for (let p of pings)
  ping(p);
