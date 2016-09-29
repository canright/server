"use strict";

const readline = require('readline'),
  config  = require('./config'),
  doms    = require('./doms'),
  hog     = require('./hog');

const
  cli       = readline.createInterface(process.stdin, process.stdout),
  CLIOFF    = '- CLI is OFF. Enter empty line to turn it on.',
  CLION     = '- CLI is ON. Enter empty line for help.',
  LOGPAUSE  = 'Logging is paused.',
  LOGRESUME = 'Logging is resumed.',
  NODEXIT   = 'Exiting node',
  clout = s => console.log(s),
  ask   = s => {clout(s); cli.prompt()},

  cliHelp =
`CLI commands:

= loging is paused on entry to the CLI.
> help   -- this help
> now    -- echo current date and time

> index      -- re-index domain map
> local host -- localhost indicated website
> clear host -- clear templates for indicated aid

> resume -- flush queued logs and stream until paused.  CLI is still active.
> pause  -- pause log stream and queue new logs until resumed.
> off    -- turn off CLI and resume log.
> exit   -- exit node.  Stop the server.
`;

exports.log = process.stdout;

var inCli = false,
  reservoir = [];

clout(CLIOFF);
cli.setPrompt('');

function say(s) {
  if (inCli)
    reservoir.push(s);
  else {
    let knt = reservoir.length;
    for (var k = 0; k < knt; ++k)
      clout(reservoir.shift());
    clout(s);
  }
}
exports.say = say;

cli.on('close', () => {
  clout('[> close]');
  process.exit(0);
});

const exe = r => {
  switch (r[0]) {

    case 'pause':
      say(LOGPAUSE);
      break;

    case 'resume':
      say(LOGRESUME);
      break;

    case 'off':
      inCli = false;
      say(CLIOFF);
      cli.setPrompt('');
      break;

   case 'exit':
      inCli = false;
      say(NODEXIT);a
      break;

    case 'now':
      ask('It is ' + new Date());
      break;

    case 'index':
      doms.initialize(config.DOMAINS)
      .then(() => console.log('Domain map is re-indexed.'));
      break;

    case 'local':
      console.log(doms.localize(r[1]));
      break;

    case 'clear':
      var dom = doms.get(r[1]);
      if (dom) {
        let {aid, vid} = dom;
        hog.clear(aid, vid);
        console.log(`Compiled templates cleared for aid ${aid} and vid ${vid}.`);
      } else
        console.log('Hostname not found.');
      break;

    case '':
    case 'help':
    default:
      ask(cliHelp);
      break;
  }
}

cli.on('line', (line) => {
  if (!line.length && !inCli) {
    cli.setPrompt('> ');
    inCli = true;
    ask(CLION);
  } else
    if (inCli)
      exe(line.trim().split(' '));
    else
      say(CLIOFF);

  cli.prompt();
  })
