/*global define, createjs, $ */

/**
 * This module handles game music
 */
define([
], function () {

    var _musicName,
        _music,

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

        preload = function (musicName) {
            if (musicName) {
                _musicName = musicName;
                playMusic();
            }
        };

    return {
        'preload'      : preload,
        'changeMusic'  : changeMusic,
        'changeVolume' : changeVolume
    };
});
