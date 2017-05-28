/**
 * Route Mappings
 * (sails.config.routes)
 *
 */

module.exports.routes = {

  'get /': 'HomeController.index',
  'get /about': 'HomeController.index',
  'get /account': 'HomeController.index',
  'get /market/:path1/:path2': 'HomeController.index',
  'get /member/:id': 'HomeController.index',

  'get /login': 'HomeController.index',
  'get /logout': 'AuthController.logout',
  'get /register': 'HomeController.index',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  /**
   * Market routes
   */
  'get /api/market': 'DataController.getCurrency',

  /**
   * Data routes
   */
  'get /api/data/currency': 'DataController.getCurrency',

  /**
   * Prediction routes
   */
  'get /api/prediction': 'PredictionController.getSome',
  'get /api/prediction/current': 'PredictionController.getCurrentPrediction',


  /**
   * User routes
   */
  'get /api/user': 'UserController.getAll',
  'get /api/user/:id': 'UserController.getOne',
  'post /api/user': 'UserController.create',

  /**
   * Exchange routes
   */

  /**
   * Post routes
   */
  'get /api/post': 'PostController.getAll',
  'get /api/post/:id': 'PostController.getOne',
  'get /api/post/url/:path': 'PostController.getByUrlTitle',
  'post /api/post': 'PostController.create',
  'delete /api/post/:id': 'PostController.destroy',


  '/.well-known/acme-challenge/d_F020DBiKbzUZZi3R_X6RsGpuoNPR_MU0yLLfvVGTM': 'HomeController.ssl',

};
