/* global app, angular */

(function() {
  app.service('currencyAPI', ['$http', function($http) {
    this.data = [];
    this.getResponse = () => {
      $http({
        method: 'GET',
        url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
      }).then(response => angular.copy(response.data, this.data));

      return this.data;
    };
  }]);
}());