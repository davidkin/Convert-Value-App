/* global angular */
(function() {
  const app = angular.module('myApp', []);

  app.config(['workWithCurrencyServiceProvider', function(workWithCurrencyServiceProvider) {
    workWithCurrencyServiceProvider.congigurateAPI('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
  }]);

  app.run(function($rootScope) {
    $rootScope.inetActive = navigator.onLine;
  });

  window.app = app;
}());