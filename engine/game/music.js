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
                    console.log('stopping music ' + _musicName);
                    _currentMusic = createjs.Sound.stop(_musicName);
                    _currentMusic = undefined;
                }
            }
        },

        stopSound = function () {
            if (require('engine/game/preferences').isSoundEnabled()) {
                if (_currentSound) {
                    console.log('stopping sound ' + _musicName);
                    _currentSound = createjs.Sound.stop(_soundName);
                    _currentSound = undefined;
                }
            }
        },

        playMusic = function (musicName) {
            if (require('engine/game/preferences').isMusicEnabled()) {
                stopMusic();
                if (musicName) {
                    _musicName = musicName;
                }
                _currentMusic = createjs.Sound.play(_musicName);
                var volume = parseInt(
                        require('engine/game/preferences').getMusicVolume(),
                        10
                    ) / 100;
                _currentMusic.setVolume(volume);
                console.log('playing music ' + _musicName + ' at ' + volume);
                _currentMusic.addEventListener("complete", function () {
                    playMusic(musicName);
                });
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
                }
                _currentSound = createjs.Sound.play(_soundName);
                var volume = parseInt(
                        require('engine/game/preferences').getSoundVolume(), 10) / 100;
                _currentSound.setVolume(volume);
                console.log('playing sound ' + _soundName + ' at ' + volume);

                _currentSound.addEventListener("complete", function () {
                    _currentSound = undefined;
                });
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
