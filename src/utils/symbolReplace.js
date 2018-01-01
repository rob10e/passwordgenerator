import passwordScore from './passwordStrengthTester';

function replaceAt(str, index, replacement) {
  return str.substr(0, index) + replacement + str.substr(index + 1);
}

function coinFlip() {
  return Math.floor(Math.random() * 2) === 0;
}

export default class SymbolReplaceGenerator {
  dataSet = {
    a: ['a', '@'],
    b: ['b', '8'],
    c: ['c', '('],
    d: ['d', '6'],
    e: ['e', '3'],
    f: ['f', '#'],
    g: ['g', '9'],
    h: ['h', '#'],
    i: ['i', '1', '!', 'l'],
    j: ['j'],
    k: ['k', '<'],
    l: ['l', '1', 'i', '!'],
    m: ['m'],
    n: ['n'],
    o: ['o', '0'],
    p: ['p'],
    q: ['q', '9'],
    r: ['r'],
    s: ['s', '$', '5'],
    t: ['t', '+'],
    u: ['u', 'v', '<', '>'],
    v: ['v', 'u', '<', '>'],
    w: ['w', 'uu', '2u', 'vv'],
    x: ['x', '%'],
    y: ['y', '?'],
    z: ['z'],
    ' ': ['_', '-', '=', ':'],
  };
  generate = (options) => {
    let inputString = options.inputString.toLowerCase();
    let password = inputString;
    let passwordIndex = 0;
    // Look for double letters, possibly change to 2+letter
    for (let index = 0; index < inputString.length - 1; index++) {
      const character = inputString[index];
      const nextCharacter = inputString[index + 1];
      if (character === nextCharacter && coinFlip()) {
        inputString = replaceAt(inputString, index, '2');
        password = replaceAt(inputString, index, '2');
        index++;
      }
    }
    // Main replacement loop
    for (let index = 0; index < inputString.length; index++) {
      const character = inputString[index];
      // Check to see if current character is even in the dataset.
      if (!(character in this.dataSet)) {
        // If not, see if it is a 2 from previous loop
        if (character === '2') {
          // It is, so skip
          passwordIndex += 2;
          index++;
          continue;        
        }
        // It's not, so remove it.
        password = replaceAt(password, passwordIndex, '');
        continue;
      }

      // Select one possibility from the dataset for the character
      const choices = this.dataSet[character];
      const choiceIndex = Math.floor(Math.random() * choices.length);
      let choice = choices[choiceIndex];
      // Given a 50/50 chance that it will replace the character
      if (choiceIndex !== 0 && coinFlip() && character !== ' ') {
        choice = choices[0];
      }

      // If the original character was selected, 50/50 chance it will be made uppercase
      if (choiceIndex === 0 && coinFlip() && character !== ' ') {
        choice = choice.toUpperCase();
      }

      // Perform the replacement.
      password = replaceAt(password, passwordIndex, choice);
      passwordIndex += choice.length;
    }

    const message = `Length: ${password.length}`;

    return { password, message, score: passwordScore(password, { minchar: 15 }) };
  };
}
