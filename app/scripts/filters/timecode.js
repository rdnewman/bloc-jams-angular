(function() {
  function timecode() {
    return function(argSeconds) {
      var totalSeconds = Math.floor(Number.parseFloat(argSeconds));

      if (Number.isNaN(totalSeconds)) {
        return '-:--';
      }

      var minutes = Math.floor(totalSeconds / 60.0);
      var seconds = totalSeconds % 60;

      var output = minutes + ':';
      if (seconds < 10) {
        output += '0';
      }
      output += seconds;

      return output;
    };
  }

  angular
    .module('blocJams')
    .filter('timecode', timecode);
})();
