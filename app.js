/**
 * app.js
 *
 */

// Ensure we're in the project directory, so relative paths work as expected
// no matter where we actually lift from.
process.chdir(__dirname);

// Ensure a "sails" can be located:
(function() {
  var sails;
  try {
    sails = require('sails');
  } catch (e) {
    return;
  }

  // Try to get `rc` dependency
  var rc;
  try {
    rc = require('rc');
  } catch (e0) {
    try {
      rc = require('sails/node_modules/rc');
    } catch (e1) {
      rc = function () { return {}; };
    }
  }

  //TODO: connect wallet to user account to store for ish aka their assets


  
  var CoinKey = require('coinkey') //1.0.0
  var coinInfo = require('coininfo')  //0.1.0
  var dogeInfo = coinInfo('DOGE').versions
  var LTCInfo = coinInfo('LTC').versions

  var ck = new CoinKey.createRandom()

  console.log('-------------------- BTC -----------------------')
  
  console.log("Private Key (Wallet Import Format): " + ck.privateWif)
  console.log("Private Key (Hex): " + ck.privateKey.toString('hex'))
  console.log("Address: " + ck.publicAddress)

  console.log('-------------------- doge -----------------------')

  var ck1 = new CoinKey.createRandom(dogeInfo)

  console.log("Private Key (Wallet Import Format): " + ck1.privateWif)
  console.log("Private Key (Hex): " + ck1.privateKey.toString('hex'))
  console.log("Address: " + ck1.publicAddress)

  console.log('-------------------- LTC -----------------------')

  var ck2 = new CoinKey.createRandom(LTCInfo)

  console.log("Private Key (Wallet Import Format): " + ck2.privateWif)
  console.log("Private Key (Hex): " + ck2.privateKey.toString('hex'))
  console.log("Address: " + ck2.publicAddress)



  // Start server
  sails.lift(rc('sails'));
})();
