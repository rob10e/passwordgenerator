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
  options,
};

export default randomGeneratorDefault;
