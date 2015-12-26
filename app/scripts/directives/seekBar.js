(function() {
  function seekBar($document) {
    var valBetween = function(value, min, max) {
      return (value > min) ? ((value < max) ? value : max) : min;
    };

    var calculatePercent = function($seekBar, event) {
      var offset = event.pageX - $seekBar.offset().left;
      var width = $seekBar.width();
      return valBetween((offset / width), 0, 1);
    };

    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) {
        scope.value = 0;
        scope.max = 100;

        var $seekBar = $(element);

        var percentString = function () {
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };

        scope.fillStyle = function() {
          return {width: percentString()};
        };

        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent($seekBar, event);
          scope.value = percent * scope.max;
        };

        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent($seekBar, event);
            scope.$apply(function() {
              scope.value = percent * scope.max;
            });
          });

          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        };

      }
    };
  }

  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);
})();
