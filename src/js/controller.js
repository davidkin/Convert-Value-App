/* global app, currencyAPIService, angular, workWithCurrencyServiceService */
(function() {
  app.controller('currencyController',
    ['currencyAPIService', 'workWithCurrencyService', function(currencyAPIService, workWithCurrencyService) {
      this.currency = currencyAPIService.getResponse();
      this.nameOfCurrency = [];

      this.tradeValue = null;
      this.receiveValue = null;

      this.currencyGiveName = 'USD';
      this.currencyReceiveName = 'RUR';

      this.convertMoney = () => {
        let result = 0;

        this.currency.forEach(({ ccy: currencyName, buy }) => {
          if (this.currencyGiveName === 'BTC') {
            result = workWithCurrencyService.convertFromBTCtoUAH(this.tradeValue, buy, this.currency[0].buy);
          } else if (currencyName === this.currencyGiveName) {
            result = workWithCurrencyService.convertToUAH(this.tradeValue, buy);
          }
        });

        this.currency.forEach(({ ccy: currencyName, sale }) => {
          if (currencyName === this.currencyReceiveName) {
            this.receiveValue = workWithCurrencyService.convertFromUAH(result, sale);
          }
        });
      };

      this.swapCurrency = () => {
        [this.currencyGiveName, this.currencyReceiveName] = [this.currencyReceiveName, this.currencyGiveName];
        [this.tradeValue, this.receiveValue] = [this.receiveValue, this.tradeValue];
      };

      this.withCommissions = $event => {
        this.convertMoney();
        const comission = workWithCurrencyService.convertWithComission(this.receiveValue, $event.target.value);
        this.receiveValue = Number((this.receiveValue - comission).toFixed(2));
      };
    }]);
}());