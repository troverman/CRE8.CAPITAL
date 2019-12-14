//START

process.chdir(__dirname);
var sails = require('sails');
var rc = require('rc');

//TODO: connect wallets to user account
var CoinKey = require('coinkey');
var coinInfo = require('coininfo');
var dogeInfo = coinInfo('DOGE').versions;
var LTCInfo = coinInfo('LTC').versions;

var ck = new CoinKey.createRandom();

console.log('-------------------- BTC -----------------------');

console.log("Private Key (Wallet Import Format): " + ck.privateWif);
console.log("Private Key (Hex): " + ck.privateKey.toString('hex'));
console.log("Address: " + ck.publicAddress);

console.log('-------------------- doge -----------------------');

var ck1 = new CoinKey.createRandom(dogeInfo);

console.log("Private Key (Wallet Import Format): " + ck1.privateWif);
console.log("Private Key (Hex): " + ck1.privateKey.toString('hex'));
console.log("Address: " + ck1.publicAddress);

console.log('-------------------- LTC -----------------------');

var ck2 = new CoinKey.createRandom(LTCInfo);

console.log("Private Key (Wallet Import Format): " + ck2.privateWif);
console.log("Private Key (Hex): " + ck2.privateKey.toString('hex'));
console.log("Address: " + ck2.publicAddress);

sails.lift(rc('sails'));
