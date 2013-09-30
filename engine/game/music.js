/*global define, createjs, $ */

/**
 * This module handles game music
 */
define([
], function () {

    var _musicName,
        _soundName,
        _menuMusic,
        _currentMusic,
        _currentSound,

        stopMusic = function () {
            if (require('engine/game/preferences').isMusicEnabled()) {
                if (_currentMusic) {
                    _currentMusic = createjs.Sound.stop(_musicName);
                    _currentMusic = undefined;
                    _musicName = undefined;
                }
            }
        },

        stopSound = function () {
            if (require('engine/game/preferences').isSoundEnabled()) {
                if (_currentSound) {
                    _currentMusic = createjs.Sound.stop(_soundName);
                    _currentSound = undefined;
                    _soundName = undefined;
                }
            }
        },

        playMusic = function (musicName) {
            if (require('engine/game/preferences').isMusicEnabled()) {
                stopMusic();
                if (musicName) {
                    _musicName = musicName;
                    _currentMusic = createjs.Sound.play(_musicName);
                    _currentMusic.setVolume(
                        parseInt(
                            require('engine/game/preferences').getMusicVolume(),
                            10
                        ) / 100);
                    _currentMusic.addEventListener("complete", function () {
                        playMusic(musicName);
                    });
                }
            }
        },

        getCurrentMusic = function () {
            return _currentMusic;
        },

        getCurrentSound = function () {
            return _currentSound;
        },

        setMenuMusic = function (music) {
            _menuMusic = music;
        },

        playMenuMusic = function () {
            playMusic(_menuMusic);
        },

        playSound = function (soundName) {
            if (require('engine/game/preferences').isSoundEnabled()) {
                if (soundName) {
                    _soundName = soundName;
                    _currentSound = createjs.Sound.play(_soundName);
                    _currentSound.setVolume(
                        parseInt(
                            require('engine/game/preferences').getSoundVolume(), 10) / 100);
                    _currentSound.addEventListener("complete", function () {
                        _currentSound = undefined;
                        _soundName = undefined;
                    });
                }
            }
        };

    return {
        'playMusic'       : playMusic,
        'stopMusic'       : stopMusic,
        'playSound'       : playSound,
        'stopSound'       : stopSound,
        'setMenuMusic'    : setMenuMusic,
        'playMenuMusic'   : playMenuMusic,
        'getCurrentMusic' : getCurrentMusic,
        'getCurrentSound' : getCurrentSound
    };
});
