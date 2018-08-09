var crypto = require('crypto');

module.exports = (howMany, chars) => {
  chars = chars
    || 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
  const rnd = crypto.randomBytes(howMany);
  const len = chars.length;
  let value = new Array(howMany);

  for (let i = 0; i < howMany; i++) {
    value[i] = chars[rnd[i] % len];
  }

  return value.join('');
};