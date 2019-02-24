/* global app, curencyAPI, angular, workWithCurrency */
(function() {
  app.controller('currencyController', ['currencyAPI', 'workWithCurrency', function(currencyAPI, workWithCurrency) {
    this.currency = currencyAPI.getResponse();
    this.nameOfCurrency = [];

    this.tradeValue = null;
    this.receiveValue = null;

    this.currencyGiveName = 'USD';
    this.currencyReceiveName = 'RUR';
  }]);
}());