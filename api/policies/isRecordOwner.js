module.exports = function(req, res, next) {
	
  	var id = req.session.user.id;

  	//sessionid == the userId that is being requested to edit
  	//preventing calls from one user with others ids

  	User.find({id:id}).then(function(user){
  		//console.log(user);
  	});
	
    return next();
};