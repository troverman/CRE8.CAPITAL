angular.module('models.order', ['lodash', 'services', 'sails.io',])

.service('OrderModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {

    this.getSome = function(limit, skip, sort, asset1, asset2, delta) {
        var query = {params:{limit: limit, skip: skip, sort: sort, asset1: asset1, asset2: asset2, delta: delta}};
        var url = utils.prepareUrl('order');
        return $sailsSocket.get(url, query).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
    
}]);