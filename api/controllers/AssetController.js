module.exports = {

	//DEPRECIATE --> UNIFY WITH CREATE BALANCE MAPPING --> STORE COMPUED STRUCT SOON
	getSome: function(req, res) {	

		var limit = req.query.limit || 1;
		var skip = req.query.skip || 0;
		var sort = req.query.sort || 'createdAt DESC';

		if (req.query.string){
			Asset.find({string:req.query.string})
			.limit(limit)
			.skip(skip).sort(sort)
			.then(function(models){
				res.json(models[0]);
			});
		}

		else{
			//GONNA HAVE ARTIFACTS
			Asset.find({user:null})
			.limit(limit)
			.skip(skip).sort(sort)
			.then(function(models){
				res.json(models);
			});
		}

	},

	
};