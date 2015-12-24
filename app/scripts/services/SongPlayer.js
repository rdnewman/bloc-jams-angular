(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    /**
    * @desc Album that is currently displayed
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong();
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      SongPlayer.currentSong = song;
      SongPlayer.currentSong.artist = currentAlbum.artist;
    };

    /**
    * @function playSong
    * @desc Plays current Buzz song object and sets song playing marker to true.  Assumes setSong() had been called sometime earlier.
    * @param none
    */
    var playSong = function() {
      currentBuzzObject.play();
      SongPlayer.currentSong.playing = true;
    };

    /**
    * @function stopSong
    * @desc Stops current Buzz song object and clears the current song playing marker.  Assumes setSong() had been called sometime earlier.
    * @param none
    */
    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    };

    /**
    * @function getSongIndex
    * @desc Determines which song number from the album is currently playing.
    * @param {Object} song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
    * @desc Song that is currently playing
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @function play
    * @desc Starts playing a song if not already playing and sets currentSong
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (song === SongPlayer.currentSong) {
        if (currentBuzzObject.isPaused()) {
          playSong();
        }
      } else {
        setSong(song);
        playSong();
      }
    };

    /**
    * @function pause
    * @desc Pauses the current song if playing
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @function previous
    * @desc Selects the song previous to the current one, based on the album's song order
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong();
      } else {
        setSong(currentAlbum.songs[currentSongIndex]);
        playSong();
      }
    };

    /**
    * @function next
    * @desc Selects the song after the current one, based on the album's song order
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex >= currentAlbum.songs.length) {
        stopSong();
      } else {
        setSong(currentAlbum.songs[currentSongIndex]);
        playSong();
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
 })();
