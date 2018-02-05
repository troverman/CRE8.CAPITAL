angular.module('models.portfolio', ['lodash', 'services', 'sails.io',])

.service('PortfolioModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {
    this.getAll = function() {
        var url = utils.prepareUrl('data');
        return $sailsSocket.get(url).then(success, error);
    };

    this.getAssets = function(user) {
        var query = {params:{user: user}};
        var url = utils.prepareUrl('asset');
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getCurrency = function() {
        var url = utils.prepareUrl('data/currency');
        return $sailsSocket.get(url).then(success, error);
    };

    this.delete = function(model) {
        var url = utils.prepareUrl('post/' + model.id);
        return $sailsSocket.delete(url).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
}]);