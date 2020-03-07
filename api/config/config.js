//SELF CONFIG
module.exports = {
	//TODO: DYNAMIC
	blueprints :{},
	bootstrap: async function(cb) {
		await initApp.init();
		cb();
	},
	//TODO: REMOVE
	datastores: {
		'default': {
			adapter: 'sails-mongo',
			url: 'mongodb://heroku_xlx65mnw:2jhrf2pimmft4eciau998simvj@ds141087-a0.mlab.com:41087,ds141087-a1.mlab.com:41087/heroku_xlx65mnw?replicaSet=rs-ds141087',
		}
	},
	globals: {_: require('lodash'), async: require('async'), models: true, services: true, sails: true,},
	http: {
		middleware: {
			prerender: require('prerender-node').set('prerenderServiceUrl', 'https://tranquil-reef-73037.herokuapp.com/').set('prerenderToken', 'V8W4l4iLL7BRD4pB8stg'),
			order: ['cookieParser','session','bodyParser','prerender','compress','poweredBy','$custom','router','www','favicon'],
		}
	},
	i18n: {},
	log: {},
	//REDUCE GLOBAL MODEL DEFINITIONS 
	//APPCECIFIC INHERITANCE 
	//META MODEL APP . . .
	models: {
		fetchRecordsOnUpdate: true,
		fetchRecordsOnCreate: true,
		fetchRecordsOnCreateEach: true,
		migrate: 'safe',
		datastore: 'default',
		attributes: {
			createdAt: { type: 'ref', columnType: 'datetime', autoCreatedAt: true, },
			updatedAt: { type: 'ref', columnType: 'datetime', autoUpdatedAt: true, },
			id: { type: 'string', columnName: '_id' }
		},
		dataEncryptionKeys: {default: 'V7TZVUpF5WLGg2c2eRVaSx0p3/4Ef11ZujTaY4EVdpY='},
	},
	passport: {
		local: {strategy: require('passport-local').Strategy},
		//bearer: {strategy: require('passport-http-bearer').Strategy},
		twitter: {
			name: 'Twitter',
			protocol: 'oauth',
			strategy: require('passport-twitter').Strategy,
			options: {
				consumerKey: 'your-consumer-key',
				consumerSecret: 'your-consumer-secret'
			}
		},
		facebook: {
			name: 'Facebook',
			protocol: 'oauth2',
			strategy: require('passport-facebook').Strategy,
			options: {
				clientID: 'your-client-id',
				clientSecret: 'your-client-secret',
				scope: ['email'] /* email is necessary for login behavior */
			}
		},
		google: {
			name: 'Google',
			protocol: 'oauth2',
			strategy: require('passport-google-oauth').OAuth2Strategy,
			options: {
				clientID: 'your-client-id',
				clientSecret: 'your-client-secret'
			}
		}
	},
	policies:{UserController: {update: ['sessionAuth']}},
	routes:{

	  'get /': 'HomeController.index',
	  'get /about': 'HomeController.index',
	  'get /account': 'HomeController.index',
	  'get /markets': 'HomeController.index',
	  'get /market/:path1': 'HomeController.index',
	  'get /market/:path1/:path2': 'HomeController.index',
	  'get /member/:id': 'HomeController.index',
	  'get /search/:path': 'HomeController.index',
	  'get /login': 'HomeController.index',
	  'get /logout': 'AuthController.logout',
	  'get /register': 'HomeController.index',

	  'post /auth/local': 'AuthController.callback',
	  'post /auth/local/:action': 'AuthController.callback',

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
	  //'get /api/asset': 'AssetController.get',
	  'get /api/data': 'DataController.get',
	  'get /api/data/buildMarketImage': 'DataController.buildMarketImage',
	  'get /api/data/marketImage': 'DataController.getMarketImage',
	  'get /api/data/latest': 'DataController.getLatestData',
	  'get /api/data/map': 'DataController.getExchangeMap',
	  'get /api/order': 'OrderController.get',
	  'get /api/orderbook': 'OrderBookController.get',
	  'get /api/prediction': 'PredictionController.get',
	  'get /api/prediction/current': 'PredictionController.getCurrentPrediction',
	  'get /api/trade': 'TradeController.getTrade',
	  'get /api/user': 'UserController.get',
	  'post /api/user': 'UserController.create',
	  'post /api/user/:id': 'UserController.update',

	  '/.well-known/acme-challenge/6vMcD5bHdA1IbOn59yq6ms_wEF_h38L-rrOhjlJOKNI': 'HomeController.ssl',
	  'get /*': {controller: "HomeController", action: "index", skipAssets: true}
	},
	security:{cors:{allRoutes: true, allowOrigins: '*'}},
	session:{secret: 'cb5b21a569493ca31834e3827c09b4ed',},
	//TODO: NETWORKING ..
	//TODO: SHARE SOCKETS AMONST PEERS
	sockets:{
		beforeConnect: function(handshake, cb) {return cb(null, true);},
		afterDisconnect: function(session, socket, cb) {return cb();},
	},
	views:{extension: 'ejs', layout: 'layout', partials: false}
}