(function() {
  function PlayerBarCtrl($scope, Fixtures, SongPlayer) {
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer;
    this.songPlayer.registerScope($scope);
  }

  angular
    .module('blocJams')
    .controller('PlayerBarCtrl', ['$scope', 'Fixtures', 'SongPlayer', PlayerBarCtrl]);
})();
