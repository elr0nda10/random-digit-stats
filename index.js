const argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('stats', 'calculate stats')
  .example('$0 stats -d 5', 'calculate stats for 5 digits number')
  .alias('d', 'digit')
  .nargs('d', 1)
  .describe('d', 'digit')
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2020')
  .demandCommand(1)
  .demandOption(['d'])
  .argv;

const digit = parseInt(argv.digit);
const [command] = argv._;

function stats(digit) {
  const Random = require('crypto-random-string');
  let firstCollision = -1;
  const mapCounter = {};
  const totalCounter = Math.pow(10, digit);
  for(let i = 0; i < totalCounter; ++i) {
    const number = Random({
      length: digit,
      type: 'numeric',
    });
    if(mapCounter[number] === undefined) {
      mapCounter[number] = 0;
    } 
    mapCounter[number]++;
    
    if(firstCollision === -1 && mapCounter[number] > 1) {
      firstCollision = i + 1;
    }
  }

  console.log(`first collision after: ${firstCollision}`);

  let totalCollision = 0;
  let maxCollision = 0;
  for(let key in mapCounter) {
    totalCollision += mapCounter[key] < 2 ? 0 : 1;
    maxCollision = Math.max(maxCollision, mapCounter[key] - 1);
  }

  console.log(`totalCollision: ${totalCollision}`);
  console.log(`maxCollision: ${maxCollision}`);
} 

switch(command) {
  case 'stats':
    stats(digit);
    break;
}
