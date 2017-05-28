angular.module('models.network', ['lodash', 'services', 'sails.io',])

.service('NetworkModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {
    this.getSome = function(limit, skip, sort, filter) {
        var url = utils.prepareUrl('prediction');
        var query = {params:{limit: limit, skip: skip, sort: sort, filter:filter}}
        return $sailsSocket.get(url, query).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
}]);