/*global define, createjs, $, window */

/**
 * This module dispatches key events
 */
define([
    'engine/gamestage'
], function (gamestage) {

    var keyPressed = false,
        keyCode,
        keyShift,

        keysCodes = {
            8: 'backspace',
            9: 'tab',
            13: 'return',
            16: 'shift',
            17: 'ctrl',
            18: 'alt',
            19: 'break',
            20: 'caps_lock',
            27: 'esc',
            32: 'space',
            33: 'page_up',
            34: 'page_down',
            35: 'end',
            36: 'home',
            37: 'left_arrow',
            38: 'up_arrow',
            39: 'right_arrow',
            40: 'down_arrow',
            45: 'insert',
            46: 'del',
            48: '0',
            49: '1',
            50: '2',
            51: '3',
            52: '4',
            53: '5',
            54: '6',
            55: '7',
            56: '8',
            57: '9',
            65: 'a',
            66: 'b',
            67: 'c',
            68: 'd',
            69: 'e',
            70: 'f',
            71: 'g',
            72: 'h',
            73: 'i',
            74: 'j',
            75: 'k',
            76: 'l',
            77: 'm',
            78: 'n',
            79: 'o',
            80: 'p',
            81: 'q',
            82: 'r',
            83: 's',
            84: 't',
            85: 'u',
            86: 'v',
            87: 'w',
            88: 'x',
            89: 'y',
            90: 'z',
            91: 'left_window_key',
            92: 'right_window_key',
            93: 'select',
            96: 'numpad_0',
            97: 'numpad_1',
            98: 'numpad_2',
            99: 'numpad_3',
            100: 'numpad_4',
            101: 'numpad_5',
            102: 'numpad_6',
            103: 'numpad 7',
            104: 'numpad_8',
            105: 'numpad_9',
            106: 'numpad_times',
            107: 'numpad_plus',
            109: 'numpad_minus',
            110: 'numpad_dot',
            111: 'numpad_slash',
            112: 'f1',
            113: 'f2',
            114: 'f3',
            115: 'f4',
            116: 'f5',
            117: 'f6',
            118: 'f7',
            119: 'f8',
            120: 'f9',
            121: 'f10',
            122: 'f11',
            123: 'f12',
            144: 'num_lock',
            145: 'scroll_lock',
            186: 'semicolon',
            187: 'equal',
            188: 'comma',
            189: 'minus',
            190: 'dot',
            191: 'question_mark'
        },

        isKeyPressed = function () {
            return isKeyPressed;
        },

        _getKeyCode = function (e) {
            return window.event
                ? window.event.keyCode
                : e.keyCode || e.which;
        },

        _getShiftKey = function (e) {
            return (window.event ? window.event.shiftKey : e.shiftKey);
        },

        onKeyDown = function (e) {
            keyPressed = true;
            keyCode = _getKeyCode(e);
            keyShift = _getShiftKey(e);
            console.log('key down kc=' + keyCode + ' ks=' + keyShift);
        },

        onKeyUp = function (e) {
            keyPressed = false;
            keyCode = undefined;
            keyShift = _getShiftKey(e);
            console.log('key up');
        },

        attachEvents = function () {
            $(window).keydown(onKeyDown);
            $(window).keyup(onKeyUp);
        };

    return {
        'attachEvents' : attachEvents,
        'isKeyPressed' : isKeyPressed
    };
});