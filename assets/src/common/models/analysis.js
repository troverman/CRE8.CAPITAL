angular.module('models.analysis', ['lodash', 'services', 'sails.io',])

.service('AnalysisModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {
    this.getFFT = function() {
        var url = utils.prepareUrl('analysis/fft');
        return $sailsSocket.get(url).then(success, error);
    };

    this.getRegression = function() {
        var url = utils.prepareUrl('analysis/regression');
        return $sailsSocket.get(url).then(success, error);
    };

    this.getPortfolioSolve = function(delta, limit) {
        var url = utils.prepareUrl('analysis/portfolioBalance');
        var query = {params:{limit: limit, delta: delta, btc:100}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getPortfolioSolveMulti = function(delta, limit) {
        var url = utils.prepareUrl('analysis/portfolioBalanceMulti');
        var query = {params:{limit: limit, delta: delta, btc:100}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
}]);