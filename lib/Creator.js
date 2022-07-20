class Creator {
  constructor() {
    this.featurePrompts = {
      name: 'project',
      message: '请选择要下载的工程',
      type: 'list',
      choices: [],
    };

    this.injectedPrompts = [];
  }

  resolveFinalPrompts() {
    this.injectedPrompts.forEach(prompt => {
      const originalWhen = prompt.when || (() => true);
      prompt.when = answers => originalWhen(answers);
    });

    const prompts = [this.featurePrompts, ...this.injectedPrompts];

    return prompts;
  }
}

module.exports = Creator;
