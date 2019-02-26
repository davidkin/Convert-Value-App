/* global app, angular, workWithCurrencyServiceService, constants */
(function() {
  app.controller('currencyController',
    ['$scope', 'workWithCurrencyService', 'constants',
      function($scope, workWithCurrencyService, constants) {
        this.currency = workWithCurrencyService.getResponse();
        this.nameOfCurrency = [];

        this.tradeValue = null;
        this.receiveValue = null;
        this.constantsFee = constants.fee;
        [this.comission] = constants.fee;

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

        $scope.$watchGroup(
          ['cc.currencyReceiveName', 'cc.currencyReceiveName', 'cc.tradeValue'],
          () => {
            this.convertMoney();
          }
        );

        $scope.$watch('cc.comission', () => {
          this.withCommissions();
        });

        this.swapCurrency = () => {
          [this.currencyGiveName, this.currencyReceiveName] = [this.currencyReceiveName, this.currencyGiveName];
          [this.tradeValue, this.receiveValue] = [this.receiveValue, this.tradeValue];
        };

        this.withCommissions = () => {
          this.convertMoney();
          const resWithFee = workWithCurrencyService.convertWithFee(this.receiveValue, this.comission);
          this.receiveValue = Number((this.receiveValue - resWithFee).toFixed(2));
        };
      }]);
}());