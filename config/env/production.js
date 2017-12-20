/**
 * Production environment settings
 *
 */

module.exports = {
  mailgun: {
    key: 'key-b93391fa17454dc097c7b8418ff0c862',
    domain: 'mail.voetr.com'
  },
  hookTimeout: 10000000,
  policies: {
    '*': ['enforceSsl', 'passport']
  },

};
