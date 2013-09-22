/*global define, createjs, $ */

/**
 * This module handles game music
 */
define([
], function () {

    var _musicName,
        _music,
        _menuMusic,

        playMusic = function () {
            _music = createjs.Sound.play(_musicName);
            _music.addEventListener("complete", function () {
                playMusic();
            });
        },

        stopMusic = function () {
            if (_music) {
                _music = createjs.Sound.stop(_musicName);
            }
        },

        changeMusic = function (item) {
            if (item.checked) {
                playMusic();
            } else {
                stopMusic();
            }
        },

        changeVolume = function (howmuch) {
            if (_music) {
                _music.setVolume(parseInt(howmuch.value, 10) / 100);
            }
        },

        setMenuMusic = function (music) {
            _menuMusic = music;
        },

        playMenuMusic = function () {
            play(_menuMusic);
        },

        play = function (musicName) {
            stopMusic();
            if (musicName) {
                _musicName = musicName;
                playMusic();
            }
        };

    return {
        'play'         : play,
        'changeMusic'  : changeMusic,
        'changeVolume' : changeVolume,
        'setMenuMusic' : setMenuMusic,
        'playMenuMusic' : playMenuMusic
    };
});
