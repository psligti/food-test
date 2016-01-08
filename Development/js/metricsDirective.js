var App = angular.module('App').directive('test', function() {
    console.log('test');
  return{
    restric: 'E',
    scope: {},
    templateUrl: 'templates/metricTemplate.html'
  };
});
