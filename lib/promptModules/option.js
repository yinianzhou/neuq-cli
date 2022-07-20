module.exports = api => {
  api.injectPrompt({
    name: 'name',
    type: 'input',
    description: `name`,
    message: `请填写名称（英文）`,
    validate: (val, answer) => {
      if (val) {
        return true;
      }
      return `please write ${answer.type} name you want create`;
    },
  });
  api.injectPrompt({
    name: 'router',
    type: 'input',
    description: `router`,
    message: '请填写路由（建议格式：/xxx/xxx）',
    when: answer => {
      return answer.type === 'module';
    },
  });
  api.injectPrompt({
    name: 'applyType',
    type: 'input',
    description: `applyType`,
    message: '请填写业务类型（可为空）',
    when: answer => {
      return answer.type === 'module';
    },
  });
  api.injectPrompt({
    name: 'description',
    type: 'input',
    description: `description`,
    message: `请填写描述（中文）`,
  });
};
