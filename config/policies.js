/**
 * Policy Mappings
 *
 */

 //TODO: POLICY APP

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  '*': true,
  '*': [ 'passport' ],

  UserController: {
    //getMine..with creds -- else, strip
    //create: ['sessionAuth'],
    update: ['sessionAuth'],
    //destroy: ['sessionAuth']
  }

  // '*': true,

};
