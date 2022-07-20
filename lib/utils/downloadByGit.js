const chalk = require('chalk');
const crossSpawn = require('cross-spawn');
const download = require('download-git-repo');
const path = require('path');
const spawn = crossSpawn.sync;
const handleTpl = require('./handlebars');
const ora = require('ora');

module.exports = function downloadByGit(answer, targetDir) {
  const spinner = ora('正在下载模板...');
  spinner.start();
  const target = path.join(targetDir || '.', 'download-tpl');
  const result = spawn(
    'git',
    ['clone', '-b', `${answer.project}`, `https://github.com/yinianzhou/neuqsoft-tpl.git`, target],
    {
      stdio: 'inherit',
    }
  );
  const error = result.error;
  if (error) {
    spinner.fail();
    console.log(chalk.red(error));
    return;
  }
  spinner.succeed('下载完成');
  handleTpl(answer, target);
};
