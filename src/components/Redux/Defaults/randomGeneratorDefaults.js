export const options = {
  upperCase: true,
  lowerCase: true,
  digits: true,
  minus: false,
  underline: false,
  space: false,
  special: false,
  brackets: false,
  highAnsi: false,
  upperCaseMinimum: true,
  lowerCaseMinimum: true,
  digitsMinimum: true,
  minusMinimum: false,
  underlineMinimum: false,
  spaceMinimum: false,
  specialMinimum: false,
  bracketsMinimum: false,
  highAnsiMinimum: false,
  length: 20,
  byEntropy: false,
  byLength: true,
  entropy: 128,
  customCharacters: '',
};

const randomGeneratorDefault = {
  generatorName: 'random',
  profile: '',
  options,
};

export const randomGeneratorProfileDefault = {
  generatorName: 'random',
  profile: 'Default',
  guid: '4e3d9fdc-819f-474b-887b-48ec561ce2e7',
  options,
};

export default randomGeneratorDefault;
