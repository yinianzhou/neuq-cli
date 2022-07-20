//generator.js
const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');
const rm = require('rimraf').sync;
const chalk = require('chalk');
const _ = require('lodash');
const ora = require('ora');

module.exports = function (metadata = {}, source, destination) {
  if (!source) {
    return Promise.reject(new Error(`无效的source：${source}`));
  }
  let resultPath = destination ? destination : `./${metadata.name}`;

  const spinner = ora('写入模板...');
  spinner.start();
  return new Promise((resolve, reject) => {
    Metalsmith(process.cwd())
      .metadata(metadata) //metadata 为用户输入的内容
      .clean(false)
      .source(source) //模板文件 path
      .destination(resultPath) //最终编译好的文件存放位置
      .use((files, metalsmith, done) => {
        Object.keys(files).forEach(fileName => {
          //遍历替换模板
          if (/^(?!\.git).*/.test(fileName)) {
            const fileContentsString = files[fileName].contents.toString(); //Handlebar compile 前需要转换为字符创
            files[fileName].contents = new Buffer.from(Handlebars.compile(fileContentsString)(metalsmith.metadata()));
          } else {
            delete files[fileName];
          }
        });
        done();
      })
      .build(err => {
        // build
        rm(source); //删除下载下来的模板文件，‘source’是路径
        if (err) {
          console.log(chalk.red(`Metalsmith build error: ${err}`));
          spinner.fail('写入失败');
          return reject(err);
        } else {
          spinner.succeed('写入完成');
          return resolve();
        }
      });
  });
};
