/* global app, angular */

(function() {
  app.service('workWithCurrencyService', ['$http', function($http) {
    this.data = [];
    this.getResponse = () => {
      $http({
        method: 'GET',
        url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
      }).then(response => angular.copy(response.data, this.data));

      return this.data;
    };

    this.convertToUAH = (currentlyVal, buyVal) => Number((currentlyVal * buyVal).toFixed(2));
    this.convertFromUAH = (sumUAH, buyVal) => Number((sumUAH / buyVal).toFixed(2));
    this.convertFromBTCtoUAH = (sumUAH, buyVal, valueUAH) => Number((sumUAH * buyVal * valueUAH).toFixed(2));

    this.convertWithFee = (sum, fee) => Number(((sum * fee) / 100).toFixed(2));
  }]);

  app.constant('constants', {
    'fee': [0, 1, 2, 3, 4, 5]
  });
}());