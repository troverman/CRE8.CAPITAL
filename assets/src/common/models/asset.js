angular.module('models.asset', ['lodash', 'services', 'sails.io',])

.service('AssetModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {

    this.getSome = function(model) {
        var url = utils.prepareUrl('asset');
        var query = {
            params:model
        };
        return $sailsSocket.get(url, query).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
    
}]);