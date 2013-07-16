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

        _pullText = function () {
            return sentence.getText(text);
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
                dec = decision.decide(selectedVerb, selectedObject);
                return dec;
            }
            if (selectedVerb.nr === 2) {
                if (!selectedObject) {
                    selectedObject = object;
                    selectedVerbSecond = selectedVerb.second;
                    _pushText(text + ' ' + selectedVerb.second);
                } else {
                    selectedObjectSecond = object;
                    _pushText(text + ' ' + selectedObjectSecond);
                    dec = decision.decide(selectedVerb, selectedObject, selectedObjectSecond);
                    return dec;
                }
            }
        },

        _displayObject = function (verb) {
            var t = (selectedVerb ? selectedVerb.text : defaultText)
                + ' ' + verb.label;
            _pushText(t);
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

        mouseOverPlayableCharacter = function (e) {
            _displayObject(e.target);
        },

        mouseOutPlayableCharacter = function (e) {
            _undisplay(e.target);
        },

        clickPlayableCharacter = function (e) {
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
        'mouseOverPlayableCharacter' : mouseOverPlayableCharacter,
        'mouseOutPlayableCharacter'  : mouseOutPlayableCharacter,
        'clickPlayableCharacter'     : clickPlayableCharacter,

        'mouseOverObject' : mouseOverObject,
        'mouseOutObject'  : mouseOutObject,
        'clickObject'     : clickObject,

        'mouseOverVerb'   : mouseOverVerb,
        'mouseOutVerb'    : mouseOutVerb,
        'clickVerb'       : clickVerb,

        'mouseOverExit'   : mouseOverExit,
        'mouseOutExit'    : mouseOutExit,
        'clickExit'       : clickExit
    };
});