/* global angular */
/* eslint-disable max-len */

(function() {
  const app = angular.module('myApp', ['ui.router']);

  app.config(['workWithCurrencyServiceProvider', '$stateProvider',
    function(workWithCurrencyServiceProvider, $stateProvider) {
      workWithCurrencyServiceProvider.congigurateAPI('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');

      $stateProvider.state({
        name: 'converter',
        url: '/converter',
        templateUrl: 'curency-converter.html'
      }).state({
        name: 'home',
        url: '/home',
        template: '<h2 class="h2">Home Page</h2>'
      });
    }]);

  app.run(function($rootScope) {
    $rootScope.inetActive = navigator.onLine;
  });

  window.app = app;
}());