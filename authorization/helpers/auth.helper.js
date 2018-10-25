const crypto = require('crypto');

const createSalt = () => crypto.randomBytes(16).toString('base64');

const createHash = (value, salt) => crypto.createHmac('sha512', salt).update(value).digest("base64");

// Export functions
exports.createHashedValue = (value) => {
  const salt = createSalt();
  const hash = createHash(value, salt);
  return `${salt}$${hash}`;
};

exports.createSalt = createSalt;

exports.createHash = createHash;