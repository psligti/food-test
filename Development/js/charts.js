var App = angular.module('App', []).controller('contentController',function($scope,$attrs){
}
).directive('charts', function() {
    console.log('hit');
  return{
    restric: 'E',
    scope: {
            chartHeader: '@chartHeader',
            chartSubheader: '@chartSubheader',
            data: '@data',
            chartType: '@chartType'
        },
    templateUrl: 'js/chartHolder.html'
  };
});
