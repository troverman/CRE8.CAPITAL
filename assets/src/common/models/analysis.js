angular.module('models.analysis', ['lodash', 'services', 'sails.io',])

.service('AnalysisModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {

    this.getPdf = function(data, period) {
        var url = utils.prepareUrl('analysis/pdf');
        var query = {params:{data: [data]}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getBband = function(data, period, sD, type) {
        var url = utils.prepareUrl('analysis/bband');
        var query = {params:{data: [data], period: period, sD:sD, type:type}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getNn = function(data, period) {
        var url = utils.prepareUrl('analysis/nn');
        var query = {params:{data: [data]}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getMacd = function(data, shortPeriod, longPeriod, signalPeriod, type) {
        var url = utils.prepareUrl('analysis/macd');
        var query = {params:{data: [data], shortPeriod:shortPeriod, longPeriod:longPeriod, signalPeriod:signalPeriod, type:type}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getFosc = function(data, period) {
        var url = utils.prepareUrl('analysis/fosc');
        var query = {params:{data: [data], period: period}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getTsf = function(data, period) {
        var url = utils.prepareUrl('analysis/tsf');
        var query = {params:{data: [data], period: period}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getEma = function(data, period) {
        var url = utils.prepareUrl('analysis/ema');
        var query = {params:{data: [data], period: period}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getFft = function() {
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
        var query = {params:{limit: limit, delta: delta, btc:100, cap:4}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getPortfolioSolvePDF = function(delta, limit) {
        var url = utils.prepareUrl('analysis/portfolioSolvePDF');
        var query = {params:{limit: limit, delta: delta, btc:100, cap:4}};
        return $sailsSocket.get(url, query).then(success, error);
    }

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
}]);