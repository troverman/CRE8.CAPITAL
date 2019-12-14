var fs = require("fs");
var Handlebars = require("handlebars");
var mailgun = require('mailgun-js')({
	apiKey: sails.config.mailgun.key,
	domain: sails.config.mailgun.domain})
	.messages();

//EMAIL SERVICE APP
	//PROVIDER: MAILGUN SERVICE APP
module.exports = {
	
	//TODO: DYNAMIC DB LOAD VS FS
	loadTemplates: function(){
		var that = this;
		var templateFileNames;
		return utilityServiceApp.promisify(fs.readdir, "./views/email/")
			.then(function(fileNames){
				templateFileNames = fileNames.map(function(fileName){return fileName.split(".").shift()});
				return Promise.all(
					fileNames.map(function(fileName){
						return utilityServiceApp.promisify(fs.readFile, "./views/email/" + fileName);
					})
				)
			})
			.then(function(files){
				templateFileNames.forEach(function(name, i){
					that.templates[name] = Handlebars.compile(files[i].toString())
				})
				return true;
			});
	},

	templates: {},

	sendTemplate: function(template, email, subject, data){
		var that = this;
		var sendData = {
			from: "no-reply@" + sails.config.mailgun.domain,
			to: email, 
			subject: subject,
			html: that.templates[template](data)
		}
		return utilityServiceApp.promisify(mailgun.send.bind(mailgun), sendData)
	},

	prepareTemplate: function(template, data){
		var that = this;
		return that.templates[template](data);
	}

}