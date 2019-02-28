/* global app, angular, workWithCurrencyServiceService, constants */
/* eslint-disable max-len*/
(function() {
  app.controller('currencyController',
    ['$scope', 'workWithCurrencyService', 'constants',
      function($scope, workWithCurrencyService, constants) {
        this.currency = workWithCurrencyService.getResponse();
        this.currencyObj = workWithCurrencyService.getList();

        [this.comission] = constants.fee;
        this.constantsFee = constants.fee;

        this.tradeValue = null;
        this.receiveValue = null;

        this.currencyGiveName = 'USD';
        this.currencyReceiveName = 'RUR';

        this.currencyObj[this.currencyGiveName] = {};
        this.currencyObj[this.currencyReceiveName] = {};

        this.convertMoney = () => {
          let result = 0;

          if (this.currencyGiveName === 'BTC') {
            result = workWithCurrencyService.convertFromBTCtoUAH(this.tradeValue, this.currencyObj[this.currencyGiveName].buy, this.currency[0].buy);
          } else {
            result = workWithCurrencyService.convertToUAH(this.tradeValue, this.currencyObj[this.currencyGiveName].buy);
          }

          this.receiveValue = workWithCurrencyService.convertFromUAH(result, this.currencyObj[this.currencyReceiveName].sale);
        };

        $scope.$watchGroup(
          ['cc.currencyReceiveName', 'cc.currencyReceiveName', 'cc.tradeValue', 'cc.comission'],
          () => {
            this.convertMoney();
            this.withCommissions();
          }
        );

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