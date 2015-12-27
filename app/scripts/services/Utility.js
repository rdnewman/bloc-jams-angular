(function() {
  function Utility() {
    var Utility = {};

    Utility.valBetween = function(value, min, max) {
      return (value > min) ? ((value < max) ? value : max) : min;
    };

    return Utility;
  }

  angular
    .module('blocJams')
    .factory('Utility', Utility);
})();
