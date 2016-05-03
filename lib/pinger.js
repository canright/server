"use strict";

const request = require('request'),
  url = 'http://webtools.canright.com/tbx/wck.asp',
  lag = 60000;

function ping() {
  request(url, function(err,rsp,bod) {
    if (err)
      console.log('PING ERROR: %s', err);
    else if (rsp.statusCode !== 200)
      console.log('PING STATUS: %d', rsp.statusCode);
    setTimeout(function(){ping()}, lag);
  })
}
ping();

