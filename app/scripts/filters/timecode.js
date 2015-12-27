(function() {
  function timecode() {
    return function(argSeconds) {
      return buzz.toTimer(argSeconds, false);
    };
  }

  angular
    .module('blocJams')
    .filter('timecode', timecode);
})();
