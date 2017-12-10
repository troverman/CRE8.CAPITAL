var fs = require("fs");
var Handlebars = require("handlebars");
var mailgun = require('mailgun-js')({
	apiKey: 1,//sails.config.mailgun.key,
	domain: 1})//sails.config.mailgun.domain})
	.messages();

module.exports = {
	loadTemplates: function(){
		var that = this;
		var templateFileNames
		return utilsService.promisify(fs.readdir, "./views/email/")
			.then(function(fileNames){
				templateFileNames = fileNames.map(function(fileName){return fileName.split(".").shift()});
				return Promise.all(
					fileNames.map(function(fileName){
						return utilsService.promisify(fs.readFile, "./views/email/" + fileName);
					})
				)
			})
			.then(function(files){
				templateFileNames.forEach(function(name, i){
					that.templates[name] = Handlebars.compile(files[i].toString())
				})
				return true;
			})
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
		return utilsService.promisify(mailgun.send.bind(mailgun), sendData)
	},

	prepareTemplate: function(template, data){
		var that = this;
		return that.templates[template](data);
	}

}