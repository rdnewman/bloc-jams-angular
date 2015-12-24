(function() {
  function SongPlayer() {
    var SongPlayer = {};

    /**
    * @desc Data for song that is current playing
    * @type {Object}
    */
    var currentSong = null;

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
        currentBuzzObject.stop();
        currentSong.playing = null;
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      currentSong = song;
    };

    /**
    * @function playSong
    * @desc Plays current Buzz song object and sets song playing marker to true.  Assumes setSong() has been called sometime earlier.
    * @param {Object} song (optional: currentSong assumed)
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      if (song) {
        song.playing = true;
      } else {
        currentSong.playing = true;
      }
    };

    /**
    * @function play
    * @desc Starts playing a song if not already playing and sets currentSong
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      if (song === currentSong) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
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
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
 })();
