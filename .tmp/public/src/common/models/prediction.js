angular.module('models.prediction', ['lodash', 'services', 'sails.io',])

.service('PredictionModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {
    this.getSome = function(limit, skip, sort, filter) {
        var url = utils.prepareUrl('prediction');
        var query = {params:{limit: limit, skip: skip, sort: sort, filter:filter}}
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getCurrentPrediction = function(asset1, asset2, predictionTime){
        var url = utils.prepareUrl('prediction/current');
        var query = {params:{asset1:asset1, asset2: asset2, predictionTime:predictionTime}}
        return $sailsSocket.get(url, query).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
}]);