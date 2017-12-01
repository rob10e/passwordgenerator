import passwordScore from './PasswordStrengthTester';

export default class RandomPasswordGenerator {
  constructor() {
    this.digits = '0123456789';
    this.lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    this.upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.space = '\u00a0';
    this.brackets = '[](){}<>';
    this.special = '!"#$%&\'*+,./:;=?@\\^`|~';
    this.minus = '-';
    this.underscore = '_';
    this.highAnsi =
      '¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ';
    this.lookAlike = 'O0l1I|';
    this.cryptoObject = null;
    this.initCrypto();
  }

  // Returns a random integer in the range [0, n) using a variety of methods
  randomInt(n) {
    let x = RandomPasswordGenerator.randomIntMathRandom(n);
    x = (x + this.randomIntBrowserCrypto(n)) % n;
    return x;
  }

  // Not secure or high quality, but always available
  static randomIntMathRandom(n) {
    const x = Math.floor(Math.random() * n);
    if (x < 0 || x >= n) {
      throw 'Arithmetic exception';
    }
    return x;
  }

  // Uses a secure, unpredictable random number generator if available; otherwise returns 0
  randomIntBrowserCrypto(n) {
    if (this.cryptoObject == null) {
      return 0;
    }

    // Generate an unbiased sample
    const x = new Uint32Array(1);
    do {
      this.cryptoObject.getRandomValues(x);
    } while (x[0] - x[0] % n > 4294967296 - n);
    return x[0] % n;
  }

  initCrypto() {
    if ('crypto' in window) {
      this.cryptoObject = crypto;
    }
  }

  generateBasic = (options) => {
    let characterSetString = '';
    if (options.brackets) characterSetString += this.brackets;
    if (options.digits) characterSetString += this.digits;
    if (options.highAnsi) characterSetString += this.highAnsi;
    if (options.lowerCase) characterSetString += this.lowerCase;
    if (options.upperCase) characterSetString += this.upperCase;
    if (options.special) characterSetString += this.special;
    if (options.space) characterSetString += this.space;
    if (options.minus) characterSetString += this.minus;
    if (options.underline) characterSetString += this.underscore;
    if (options.customCharacters) characterSetString += options.customCharacters;

    const characterSet = [];
    for (let i = 0; i < characterSetString.length; i++) {
      const c = characterSetString.charCodeAt(i);
      let s = null;
      let d = null;
      if (c < 0xd800 || c >= 0xe000) {
        // Regular character
        s = characterSetString.charAt(i);
      } else if (c >= 0xd800 && c < 0xdc00) {
        // High ansi
        if (i + 1 < characterSetString.length) {
          d = characterSetString.charCodeAt(i + 1);
          if (d >= 0xdc00 && d < 0xe000) {
            // Valid characters in supplementary plane
            s = characterSetString.substr(i, 2);
            i++;
          }
          // Else discard unpaired surrogate
        }
      } else if (d >= 0xdc00 && d < 0xe000) {
        // low surrogate
        i++; // discard
      } else {
        throw 'Assertion Error';
      }

      if (s != null && characterSet.indexOf(s) === -1) {
        characterSet.push(s);
      }
    }

    let password = '';
    let message = '';
    if (characterSet.length === 0) {
      message = 'Error: character set is empty';
    } else if (options.byEntropy && characterSet.length === 1) {
      message = 'Error: Need at least 2 distinct characters in set';
    } else {
      let length = 0;
      if (options.byLength) {
        length = options.length;
      } else if (options.byEntropy) {
        length = Math.ceil(
          parseFloat(options.entropy) * Math.log(2) / Math.log(characterSet.length),
        );
      } else {
        throw 'Assertion error';
      }

      if (length < 0) {
        message = 'Negative password length';
      } else if (length > 10000) {
        message = 'Password length too large';
      } else {
        for (let i = 0; i < length; i++) {
          password += characterSet[this.randomInt(characterSet.length)];
        }

        const entropy = Math.log(characterSet.length) * length / Math.log(2);
        let entropyString = '';
        if (entropy < 70) {
          entropyString = entropy.toFixed(2);
        } else if (entropy < 200) {
          entropyString = entropy.toFixed(1);
        } else {
          entropyString = entropy.toFixed(0);
        }

        message = `Length = ${length} chars, \u00a0Charset size = ${
          characterSet.length
        } symbols. \u00a0Entropy = ${entropyString} bits`;
      }
    }

    return { password, message, score: passwordScore(password, { minchar: 10 }) };
  };
}
