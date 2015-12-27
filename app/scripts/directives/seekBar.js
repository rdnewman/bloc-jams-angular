(function() {
  function seekBar($document, Utility) {

    var calculatePercent = function($seekBar, event) {
      var offset = event.pageX - $seekBar.offset().left;
      var width = $seekBar.width();
      return Utility.valBetween((offset / width), 0, 1);
    };

    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: {
        onChange: '&'
      },
      link: function(scope, element, attributes) {
        scope.value = 0;
        scope.max = 100;

        var $seekBar = $(element);

        attributes.$observe('value', function(newValue) {
          scope.value = newValue;
        });

        attributes.$observe('max', function(newValue) {
          scope.max = newValue;
        });

        var percentString = function () {
          var percent = (scope.value / scope.max) * 100;
          return percent + "%";
        };

        var updateValue = function(event) {
          scope.value = scope.max * calculatePercent($seekBar, event);
          notifyOnChange(scope.value);
        };

        var notifyOnChange = function(newValue) {
          if (typeof scope.onChange === 'function') {
            scope.onChange({value: newValue});
          }
        };

        scope.fillStyle = function() {
          return {width: percentString()};
        };

        scope.thumbStyle = function() {
          return {left: percentString()};
        };

        scope.onClickSeekBar = function(event) {
          updateValue(event);
        };

        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            scope.$apply(function() {
              updateValue(event);
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
    .directive('seekBar', ['$document', 'Utility', seekBar]);
})();
