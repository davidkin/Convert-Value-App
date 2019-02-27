/* global app */

app.directive('checkConnection', function() {
  return {
    restrict: 'A',
    templateUrl: 'internet.html'
  };
});