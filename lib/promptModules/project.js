module.exports = api => {
  api.injectFeature({
    name: 'H5 （个人H5）',
    value: 'H5',
    description: '个人h5',
    checked: true,
  });
  api.injectFeature({
    name: 'WEB （个人WEB）',
    value: 'WEB',
    description: '个人web',
  });
  api.injectFeature({
    name: 'INTEGRATED_WSSB_CD （网报）',
    value: 'INTEGRATED_WSSB_CD',
    description: '网报',
  });
};
