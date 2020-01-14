//CRE8.CAPITAL.UTILITY
//UTILITY APP

module.exports = {

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

	//POWER SET
	getAllSubsets: function(theArray) {
		return theArray.reduce(function (subsets, value) {
			return subsets.concat(subsets.map(function (set) {
				return [value].concat(set);
			}));
		}, [[]]);
	},

	intersect: function(a, b) {return a.filter(Set.prototype.has, new Set(b));},
	diff: function (a, b) {return a.filter(function(i) {return b.indexOf(i) < 0;});},

	arraysEqual:function(a, b) {
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (a.length != b.length) return false;
		for (var i = 0; i < a.length; ++i) {if (a[i] !== b[i]) return false;}
		return true;
	},

	isInArray: function(array, item) {
	    for (var i=0;i<array.length;i++) {if(JSON.stringify(array[i]) == JSON.stringify(item)){return true;}}
	    return false;
	},

	removeMirrorDuplicates: function(array){
		var array1 = [];
		var array2 = [];
		var mirrorArray = array.map(function(obj){
			return [obj[1],obj[0]];
		});
		for (x in array){
			array1.push(array[x]);
			if (!dataServiceApp.utility.isInArray(array1, mirrorArray[x])){
				array2.push(array[x]);
			}
		}
		return array2;
	},

	generate: function(model) {return 100;},

 	searchObject: function(object, matchCallback, currentPath, result, searched) {
        currentPath = currentPath || '';
        result = result || [];
        searched = searched || [];
        if (searched.indexOf(object) !== -1 && object === Object(object)) {return;}
        searched.push(object);
        if (matchCallback(object)) {result.push({path: currentPath, value: object});}
        try {
            if (object === Object(object)) {
                for (var property in object) {
                    if (property.indexOf("$") !== 0) {
                        searchObject(object[property], matchCallback, currentPath + "." + property, result, searched);
                    }
                }
            }
        }
        catch (e) {console.log(object); throw e;}
        return result;
    },

    updateObject: function(object, newValue, path){
        var stack = path.split('.');
        stack.shift();
        while(stack.length>1){object = object[stack.shift()];}
        object[stack.shift()] = newValue;
    },

}