/*global define, createjs, $ */

/**
 * capture mouse actions, dispatch into actions
 */
define([
    'engine/config',
    'engine/sentence/main',
    'engine/interaction/decision'
], function (
    config,
    sentence,
    decision
) {
    var selectedVerb = false,
        selectedVerbSecond = false,
        selectedObject = false,
        selectedObjectSecond = false,
        text,
        defaultText = config.get('sentence.defaultText'),

        _pushText = function (_text) {
            text = _text;
            sentence.setText(text);
        },


        reset = function (e) {
            selectedVerb = false;
            selectedVerbSecond = false;
            selectedObject = false;
            selectedObjectSecond = false;
            _pushText(defaultText);
        },

        _getDefaultText = function () {
            var t = '';
            if (!selectedVerb) {
                return defaultText;
            }
            t = selectedVerb.text;
            if (!selectedObject) {
                return t;
            }
            t += ' ' + selectedObject.label;
            if (!selectedVerbSecond) {
                return t;
            }
            t += ' ' + selectedVerbSecond;
            return t;
        },

        // setting an object can imply an action.
        // return it so that the playable character can do something.
        _setObject = function (object) {
            var dec;
            // if verb cardinality is 1, do something.
            if (selectedVerb.nr === 1) {
                selectedObject = object;
                return decision.decide(selectedVerb, selectedObject);
            }
            if (selectedVerb.nr === 2) {
                if (!selectedObject) {
                    selectedObject = object;
                    selectedVerbSecond = selectedVerb.second;
                    _pushText(text + ' ' + selectedVerb.second);
                } else {
                    selectedObjectSecond = object;
                    _pushText(text + ' ' + selectedObjectSecond);
                    return decision.decide(selectedVerb, selectedObject, selectedObjectSecond);
                }
            }
        },

        _displayObject = function (object) {
            var t = (selectedVerb ? selectedVerb.text : defaultText);
            if (!selectedObject) {
                t += ' ' + object.label;
                _pushText(t);
            } else {
                t += ' ' + selectedObject.label;
                if (selectedVerbSecond) {
                    t += ' ' + selectedVerbSecond + ' ' + object.label;
                }
                _pushText(t);
            }
        },

        _displayExit = function (exit) {
            var t = defaultText + ' ' + exit.label;
            _pushText(t);
        },

        _undisplay = function () {
            _pushText(_getDefaultText());
        },

        _clearObject = function () {
            selectedObject = false;
        },

        _setVerb = function (verb) {
            selectedVerb = verb;
            _pushText(verb.text);
        },

        _setExit = function (verb) {
            selectedVerb = false;
            _displayExit(verb);
        },

        _displayVerb = function (verb) {
            _pushText(verb.text);
        },

        _clearVerb = function () {
            selectedVerb = false;
        },

        mouseOverNonPlayableCharacter = function (e) {
            _displayObject(e.target);
        },

        mouseOutNonPlayableCharacter = function (e) {
            _undisplay(e.target);
        },

        clickNonPlayableCharacter = function (e) {
            return _setObject(e.target);
        },

        mouseOverObject = function (e) {
            _displayObject(e.target);
        },

        mouseOutObject = function (e) {
            _undisplay(e.target);
        },

        clickObject = function (e) {
            return _setObject(e.target);
        },

        mouseOverVerb = function (e) {
            _displayVerb(e.target);
        },

        mouseOutVerb = function (e) {
            _undisplay(e.target);
        },

        clickVerb = function (e) {
            return _setVerb(e.target);
        },

        mouseOverExit = function (e) {
            _displayExit(e.target);
        },

        mouseOutExit = function (e) {
            _undisplay(e.target);
        },

        clickExit = function (e) {
            return _setExit(e.target);
        };

    return {
        'mouseOverNonPlayableCharacter' : mouseOverNonPlayableCharacter,
        'mouseOutNonPlayableCharacter'  : mouseOutNonPlayableCharacter,
        'clickNonPlayableCharacter'     : clickNonPlayableCharacter,

        'mouseOverObject' : mouseOverObject,
        'mouseOutObject'  : mouseOutObject,
        'clickObject'     : clickObject,

        'mouseOverVerb'   : mouseOverVerb,
        'mouseOutVerb'    : mouseOutVerb,
        'clickVerb'       : clickVerb,

        'mouseOverExit'   : mouseOverExit,
        'mouseOutExit'    : mouseOutExit,
        'clickExit'       : clickExit,

        'reset'           : reset
    };
});