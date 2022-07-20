#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const create = require('../lib/create');

program.version(require('../package').version, '-v, --version').usage('<command> [options]');

program
  .command('create')
  .alias('c')
  .description('create what you want to create')
  .action(() => {
    create();
  });

program.parse(process.argv);

if (program.args.length === 0) {
  console.log(chalk.red('syntax error'));
  program.help();
}
