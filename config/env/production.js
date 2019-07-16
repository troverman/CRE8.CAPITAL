/**
 * Production environment settings
 *
 */

module.exports = {
  hookTimeout: 10000000,
  mailgun: {
    key: '123',
    domain: '123'
  },
  policies: {
    '*': ['enforceSsl', 'passport']
  },

};
