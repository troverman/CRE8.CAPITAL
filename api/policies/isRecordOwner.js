var App = async function(input, output, next) {
  	var id = input.session.user.id;
  	//sessionid == the userId that is being requested to edit
  	//preventing calls from one user with others ids
  	await User.find({id:id});
    return next();
};
module.exports = App;