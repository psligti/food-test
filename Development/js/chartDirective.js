var App = angular.module('App').directive('chart', function($http){
    return{
        restrict: 'E',
        link: function(scope, elem, attrs){
            var file = attrs.chartFile,
                chart = null,
                options = {
                  series: {},
                  xaxis: {
                      tickDecimals: 0
                  },
                  colors: ["#1ab394"],
                  grid: {
                      color: "#999999",
                      hoverable: true,
                      clickable: true,
                      tickColor: "#D4D4D4",
                      borderWidth: 0
                  },
                  legend: {
                      show: true
                  },
                  tooltip: true,
                  tooltipOpts: {
                      content: "x: %x, y: %y"
                  }
              };
            if(scope.chartType === 'bar'){
              console.log('bar');
              options.series.bars = {
                  show: true,
                  barWidth: 0.6,
                  fill: true,
                  fillColor: {
                      colors: [{
                          opacity: 0.8
                      }, {
                          opacity: 0.8
                      }
                      ]
                  }
              }
            } else if (scope.chartType === 'line') {
              console.log('line');
              options.series.lines = {
                  show: true,
                  lineWidth: 2,
                  fill: true,
                  fillColor: {
                      colors: [{
                          opacity: 0.0
                      }, {
                          opacity: 0.0
                      }
                      ]
                  }
              }
            } else if (scope.chartType === 'pie') {
              options.series.pie = {
                  show: true
              }
            }
            $http({method: 'GET',url: scope.data}).success(function(response){
            //If the data changes somehow, update it in the chart
                 if(!chart){
                   console.log(response.data);
                    chart = $.plot(elem, response.data , options);
                    elem.show();
                }else{
                    chart.setData(response.data);
                    chart.setupGrid();
                    chart.draw();
                }

            });
        }
    };
});
