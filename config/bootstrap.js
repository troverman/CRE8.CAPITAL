module.exports.bootstrap = async function(cb) {

	await initApp.init();
	cb();

};
