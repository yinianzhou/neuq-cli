module.exports = api => {
  api.injectPrompt({
    name: 'type',
    type: 'list',
    description: `check type you want to create`,
    choices: ['module'],
    message: '选择要下载的类型',
  });
};
