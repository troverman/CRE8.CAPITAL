/**
 * Production environment settings
 *
 */

module.exports = {

  hookTimeout: 10000000,
  policies: {
    '*': ['enforceSsl', 'passport']
  },


  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMysqlServer'
  // },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  // port: 80,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }
  //    '*': [ 'passport' ]

};
