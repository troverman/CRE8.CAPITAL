module.exports = {
	/*convert function w/ function(err,result) style callback to promise*/
	promisify: function(){
		var args = Array.prototype.slice.call(arguments);
		var prePromise = args.shift();
		var that = this;

		return new Promise(function(resolve,reject){
			prePromise.apply(that, args.concat(function(err,result){
				if (err) reject(err);
				else resolve(result);
			}));
		});
	},

	guid: function(){
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    s4() + '-' + s4() + s4() + s4();
	},

}