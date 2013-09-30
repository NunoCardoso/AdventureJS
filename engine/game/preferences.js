/*global define, createjs, $ */

/**
 * This module handles game music
 */
define([
    'engine/game/music'
], function (
    gamemusic
) {
    var _type,
        _musicEnable,
        _soundEnable,
        _musicVolume,
        _soundVolume,
        _debug,

        _default = {
            'type' : 'game',
            'musicVolume' : 100,
            'soundVolume' : 100,
            'soundEnable' : true,
            'musicEnable' : false,
            'debug' : false
        };

        //To set a cookie
    var setCookieValue = function (key, value) {
            $.cookie(key, value, { 'expires': 7, 'path': '/'});
        },

        getCookieValue = function (key) {
            return $.cookie(key);
        },

        deleteCookie = function (key) {
            return $.cookie(key, null);
        },

        _get = function () {
            return {
                'type' : _type,
                'musicVolume' : _musicVolume,
                'soundVolume' : _soundVolume,
                'soundEnable' : _soundEnable,
                'musicEnable' : _musicEnable,
                'debug' : _debug
            };
        },

        _setCookiesToDefaultValue = function () {
            _setType(_default.type);
            _setMusicVolume(_default.musicVolume);
            _setMusicEnable(_default.musicEnable);
            _setSoundVolume(_default.soundVolume);
            _setSoundEnable(_default.soundEnable);
            _setDebug(_default.debug);
        },

        getPreferences = function () {
            var type = getCookieValue('type');
            if (type !== 'game') {
                _setCookiesToDefaultValue();
                return _default;
            }
            _type = getCookieValue('type');
            _musicVolume = getCookieValue('musicVolume');
            _soundVolume = getCookieValue('soundVolume');
            _soundEnable = getCookieValue('soundEnable');
            _musicEnable = getCookieValue('musicEnable');
            _debug = getCookieValue('debug');
            return _get();
        },

        _setMusicVolume = function (volume) {
            _musicVolume = volume;
            setCookieValue('musicVolume', volume);
        },

        _setMusicEnable = function (enable) {
            _musicEnable = enable;
            setCookieValue('musicEnable', enable);
        },

        _setSoundVolume = function (volume) {
            _soundVolume = volume;
            setCookieValue('soundVolume', volume);
        },

        _setSoundEnable = function (enable) {
            _soundEnable = enable;
            setCookieValue('soundEnable', enable);
        },

        _setDebug = function (debug) {
            _debug = debug;
            setCookieValue('debug', debug);
        },

        _setType = function (type) {
            _type = type;
            setCookieValue('type', type);
        },

        musicVolumeChanged = function (howmuch) {
            var music = gamemusic.getCurrentMusic();
            _setMusicVolume(howmuch);
            if (music) {
                music.setVolume(parseInt(howmuch.value, 10) / 100);
            }
        },

        enableMusicChanged = function (item) {
            if (item.checked) {
                _setMusicEnable(true);
                gamemusic.playMusic();
            } else {
                _setMusicEnable(false);
                gamemusic.stopMusic();
            }
        },

        soundVolumeChanged = function (howmuch) {
            var sound = gamemusic.getCurrentSound();
            _setSoundVolume(howmuch);
            if (sound) {
                sound.setVolume(parseInt(howmuch.value, 10) / 100);
            }
        },

        enableSoundChanged = function (item) {
            if (item.checked) {
                _setSoundEnable(true);
            } else {
                _setSoundEnable(false);
            }
        },

        isSoundEnabled = function () {
            return _soundEnable;
        },

        isMusicEnabled = function () {
            return _musicEnable;
        },

        getSoundVolume = function () {
            return _soundVolume;
        },

        getMusicVolume = function () {
            return _musicVolume;
        },

        enableDebugChanged = function (debug) {
            _setDebug(debug);
        };

    return {
        'getPreferences' : getPreferences,
        'musicVolumeChanged' : musicVolumeChanged,
        'enableMusicChanged' : enableMusicChanged,
        'soundVolumeChanged' : soundVolumeChanged,
        'enableSoundChanged' : enableSoundChanged,
        'enableDebugChanged' : enableDebugChanged,
        'isSoundEnabled' : isSoundEnabled,
        'isMusicEnabled' : isMusicEnabled,
        'getSoundVolume' : getSoundVolume,
        'getMusicVolume' : getMusicVolume
    };
});
