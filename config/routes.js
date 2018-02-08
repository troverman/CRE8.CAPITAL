/**
 * Route Mappings
 * (sails.config.routes)
 *
 */

module.exports.routes = {

  'get /': 'HomeController.index',
  'get /about': 'HomeController.index',
  'get /account': 'HomeController.index',
  'get /markets': 'HomeController.index',
  'get /market/:path1': 'HomeController.index',
  'get /market/:path1/:path2': 'HomeController.index',
  'get /member/:id': 'HomeController.index',
  'get /search/:id': 'HomeController.index',

  'get /login': 'HomeController.index',
  'get /logout': 'AuthController.logout',
  'get /register': 'HomeController.index',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  /**
   * Analysis routes
   */
  'get /api/analysis/portfolioBalance': 'AnalysisController.portfolioBalance',
  'get /api/analysis/portfolioBalanceMulti': 'AnalysisController.portfolioBalanceMulti',
  'get /api/analysis/portfolioSolvePDF': 'AnalysisController.portfolioSolvePDF',
  'get /api/analysis/fft': 'AnalysisController.fft',
  'get /api/analysis/regression': 'AnalysisController.regression',
  'get /api/analysis/ema': 'AnalysisController.ema',
  'get /api/analysis/tsf': 'AnalysisController.tsf',
  'get /api/analysis/bband': 'AnalysisController.bband',
  'get /api/analysis/pdf': 'AnalysisController.pdf',
  'get /api/analysis/macd': 'AnalysisController.macd',
  'get /api/analysis/fosc': 'AnalysisController.fosc',
  'get /api/analysis/rsi': 'AnalysisController.rsi',

   /**
   * Asset routes
   */
  'get /api/asset': 'AssetController.getSome',


  /**
   * Market routes
   */
  'get /api/market': 'DataController.getCurrency',

  /**
   * Data routes
   */
  'get /api/data': 'DataController.getData',
  'get /api/data/latest': 'DataController.getLatestData',
  'get /api/data/currency': 'DataController.getCurrency',
  'get /api/data/ticker': 'DataController.getTicker',

  /**
   * Order routes
   */
  'get /api/order': 'OrderController.getSome',

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


  '/.well-known/acme-challenge/6vMcD5bHdA1IbOn59yq6ms_wEF_h38L-rrOhjlJOKNI': 'HomeController.ssl',

};
