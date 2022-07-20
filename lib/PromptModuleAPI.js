module.exports = class PromptModuleAPI {
  constructor(creator) {
    this.creator = creator;
  }

  injectFeature(feature) {
    this.creator.featurePrompts.choices.push(feature);
  }

  injectPrompt(prompt) {
    this.creator.injectedPrompts.push(prompt);
  }

  injectOptionForPrompt(name, option) {
    this.creator.injectedPrompts
      .find(f => {
        return f.name === name;
      })
      .choices.push(option);
  }
};
