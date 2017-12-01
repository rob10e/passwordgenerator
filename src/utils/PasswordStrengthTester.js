const common = [
  'password',
  '123456',
  '123',
  '1234',
  'mypass',
  'pass',
  'letmein',
  'qwerty',
  'monkey',
  'asdfgh',
  'zxcvbn',
  'pass',
  'contraseña',
];

const getPasswordStrength = (score) => {
  let strength = 0;
  if (score === -200) {
    strength = 0;
  } else if (score < 0 && score > -199) {
    strength = 1;
  } else if (score <= 10) {
    strength = 2;
  } else if (score > 10 && score <= 15) {
    strength = 3;
  } else if (score > 15 && score <= 30) {
    strength = 4;
  } else if (score > 30 && score <= 40) {
    strength = 5;
  } else {
    strength = 6;
  }

  return strength;
};

const getPasswordScore = (value, options) => {
  let score = 0;
  if (value.length < options.minchar) {
    score -= 100;
  } else if (value.length >= options.minchar && value.length <= options.minchar + 2) {
    score += 6;
  } else if (value.length >= options.minchar + 3 && value.length <= options.minchar + 4) {
    score += 12;
  } else if (value.length >= options.minchar + 5) {
    score += 18;
  }
  if (value.match(/[a-z]/)) {
    // Match lowercase
    score += 1;
  }
  if (value.match(/[A-Z]/)) {
    // Match uppercase
    score += 5;
  }
  if (value.match(/\d+/)) {
    // Match digits
    score += 5;
  }
  if (value.match(/(.*[0-9].*[0-9].*[0-9])/)) {
    score += 7;
  }
  if (value.match(/.[!@#$%^&*?_~]/)) {
    // Match symbols
    score += 5;
  }
  if (value.match(/(.*[!@#$%^&*?_~].*[!@#$%^&*?_~])/)) {
    score += 7;
  }
  if (value.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    score += 2;
  }
  if (value.match(/([a-zA-Z])/) && value.match(/([0-9])/)) {
    score += 3;
  }
  if (value.match(/([a-zA-Z0-9].*[!@#$%^&*?_~])|([!@#$%^&*?_~].*[a-zA-Z0-9])/)) {
    score += 3;
  }
  for (let i = 0; i < common.length; i++) {
    if (value.toLowerCase() === common[i]) {
      score = -200;
    }
  }
  return { score, strength: getPasswordStrength(score) };
};

export default getPasswordScore;
