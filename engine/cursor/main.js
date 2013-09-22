/*global define */

/**
 * This module handles the cursor
 */
define([
    'engine/cursor/cursor',
    'engine/cursor/target'
], function (
    Cursor,
    Target
) {
    var _,
        _stage,
        _xy,
        _t,

        changeTo = function (what) {
            if (!_.busy) {
                _.changeTo(what);
            }
        },

        setBusy = function () {
            changeTo('image.cursor.wait');
            _.busy = true;
        },

        setNotBusy = function () {
            _.busy = false;
            changeTo('image.cursor.default');
        },

        isBusy = function () {
            return _.busy;
        },

        reset = function () {
            _.reset();
        },

        preload = function () {
            _ = new Cursor();
            _t = new Target(); 
        },

        get = function () {
            return _;
        },

        setStage = function (stage) {
            _stage = stage;
        },

        goLeft = function (speed) {
            _xy.x -= speed;
            _.update(_stage, _xy);
        },

        goUp = function (speed) {
            _xy.y -= speed;
            _.update(_stage, _xy);
        },

        goRight = function (speed) {
            _xy.x += speed;
            _.update(_stage, _xy);
        },

        goDown = function (speed) {
            _xy.y += speed;
            _.update(_stage, _xy);
        },

        update = function (xy, role) {
            _xy = xy;
            _.update(_stage, _xy, 'hover', role);
        },

        // if it is from keyboard, xy is undefined, use latest.
        // if from the mouse, xy is defined;
        click = function (xy, role) {
            _xy = xy || _xy;
            _.update(_stage, _xy, 'click', role);
        },

        drag = function (xy, role) {
            _xy = xy || _xy;
            _.update(_stage, _xy, 'drag', role);
        },

        undrag = function (xy, role) {
            _xy = xy || _xy;
            _.update(_stage, _xy, 'undrag', role);
        },

        setTargetPosition = function (xy) {
            _t.x = xy.x;
            _t.y = xy.y;
        },

        getTarget = function () {
            return _t;
        };

    return {
        'changeTo': changeTo,
        'setBusy' : setBusy,
        'setNotBusy' : setNotBusy,
        'isBusy'  : isBusy,
        'reset'   : reset,
        'preload' : preload,
        'get'     : get,
        'update'  : update,
        'click'   : click,
        'drag'    : drag,
        'undrag'  : undrag,
        'setStage': setStage,
        'goLeft'  : goLeft,
        'goUp'    : goUp,
        'goRight' : goRight,
        'goDown'  : goDown,
        'setTargetPosition' : setTargetPosition,
        'getTarget' : getTarget
    };
});
