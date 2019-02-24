/* global app, curencyAPI, angular, workWithCurrency */
(function() {
  app.controller('currencyController', ['currencyAPI', 'workWithCurrency', function(currencyAPI, workWithCurrency) {
    this.currency = currencyAPI.getResponse();
    this.nameOfCurrency = [];

    this.tradeValue = null;
    this.receiveValue = null;

    this.currencyGiveName = 'USD';
    this.currencyReceiveName = 'RUR';

    this.convertMoney = () => {
      let result = 0;

      this.currency.forEach(({ ccy: currencyName, buy }) => {
        if (this.currencyGiveName === 'BTC') {
          result = workWithCurrency.convertFromBTCtoUAH(this.tradeValue, buy, this.currency[0].buy);
        } else if (currencyName === this.currencyGiveName) {
          result = workWithCurrency.convertToUAH(this.tradeValue, buy);
        }
      });

      this.currency.forEach(({ ccy: currencyName, sale }) => {
        if (currencyName === this.currencyReceiveName) {
          this.receiveValue = workWithCurrency.convertFromUAH(result, sale);
        }
      });
    };
  }]);
}());