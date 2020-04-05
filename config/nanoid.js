const { customAlphabet } = require('nanoid/async');

module.exports = customAlphabet(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    process.env.LENGTH_OF_SLUG
);
