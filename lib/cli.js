"use strict";

const readline = require('readline');

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
> help       -- this help

> resume -- flush queued logs and stream until paused.  CLI is still active.
> pause  -- pause log stream and queue new logs until resumed.
> off    -- turn off CLI and resume log.
> exit   -- exit node.  Stop the server.
> now    -- echo current date and time
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
      say(NODEXIT);
      process.exit(0);
      break;

    case 'now':
      ask('It is ' + new Date());
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
