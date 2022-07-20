const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');
const PromptModuleAPI = require('./PromptModuleAPI');
const Creator = require('./Creator');
const clearConsole = require('./utils/clearConsole');
const downLoadByGit = require('./utils/downloadByGit');
const currentPath = process.cwd().replace(/\\/g, '/') + '/';

async function create() {
  const creator = new Creator();
  const promptModules = getPromptModules();
  const promptAPI = new PromptModuleAPI(creator);
  promptModules.forEach(m => m(promptAPI));

  clearConsole();

  let answers = await inquirer.prompt(creator.resolveFinalPrompts());
  if (answers.router) {
    answers.routerName = answers.router
      .split('/')
      .filter(item => item)
      .join('-');
  }
  console.log(chalk.blue(`setting of your choice: `), answers);

  const name = answers.name;

  const targetDir = path.resolve(currentPath, name);
  try {
    const res = await fs.pathExists(targetDir);
    if (res) {
      console.log(chalk.red('Error, In this directory, the project name already exsits !'));
      return;
    }
    downLoadByGit(answers, targetDir);
  } catch (error) {
    console.error(chalk.red(error));
  }
}

function getPromptModules() {
  return ['project', 'type', 'option'].map(file => require(`./promptModules/${file}`));
}

module.exports = create;
