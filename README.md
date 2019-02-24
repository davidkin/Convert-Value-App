**Getting started**
1) Install npm modules -> `npm i`;
2) Open your page in browser -> `npm start`.

## APP
In the file “app.js” you can find the creation "myApp" module:

```
    const app = angular.module('myApp', []);
```
## Controller
In file "controller.js" you will find the creation "currencyController" controller, which has methods:
* `convertMoney` - count money convertation;
* `swapCurrency` - choose @buy@ or @sell@;
* `withCommissions` - count money convertation with comission;

## Filter
In file "filter.js" you will find the creation "currencyFilter" filter,

## Filter
In file "services.js" you will find the creation services: 
* `currencyAPI` - get currency value from Privat24 API;
* `workWithCurrency` - work with money convertation
    > > `convertToUAH` - convert money to UAH;
    > > `convertFromUAH` - convert money from UAH;
    > > `convertFromBTCtoUAH` - convert money from BTC to UAH;
    > > `convertWithComission` - count convertation with comission;