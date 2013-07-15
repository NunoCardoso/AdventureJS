/*global define, createjs, $ */

/**
 * capture mouse actions, dispatch into actions
 */
define([
    'engine/config',
    'engine/panel/main'
], function (
    config,
    gamepanel
) {

    var selectedVerb = false,
        selectedVerbSecond = false,
        selectedObject = false,
        text,
        defaultText = config.get('panel.sentence.defaultText'),

        _pushText = function (_text) {
            text = _text;
            gamepanel.getSentence().text = text;
        },

        _pullText = function () {
            return gamepanel.getSentence().text;
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

        _decideAction = function () {
            // ok, action is going to be performed , let's reset the sentence
            var textToSay = _getDefaultText();

            selectedVerb = false;
            selectedVerbSecond = false;
            selectedObject = false;

            _pushText(textToSay);

            return {
                'action' : 'say',
                'text'   : textToSay
            };
        },

        // setting an object can imply an action.
        // return it so that the playable character can do something.
        _setObject = function (object) {
            selectedObject = object;

            // if verb cardinality is 1, do something.
            if (selectedVerb.nr === 1) {
                return _decideAction();
            }
            if (selectedVerb.nr === 2) {
                selectedVerbSecond = selectedVerb.second;
                _pushText(text + ' ' + selectedVerb.second);
                return undefined;
            }
        },

        _displayObject = function (verb) {
            var t = (selectedVerb ? selectedVerb.text : defaultText)
                + ' ' + verb.label;
            _pushText(t);
        },

        _undisplayObject = function () {
            _pushText(_getDefaultText());
        },

        _clearObject = function () {
            selectedObject = false;
        },

        _setVerb = function (verb) {
            selectedVerb = verb;
            _pushText(verb.text);
        },

        _displayVerb = function (verb) {
            _pushText(verb.text);
        },

        _undisplayVerb = function () {
            _pushText(_getDefaultText());
        },

        _clearVerb = function () {
            selectedVerb = false;
        },

        mouseOverPlayableCharacter = function (e) {
            _displayObject(e.target);
        },

        mouseOutPlayableCharacter = function (e) {
            _undisplayObject(e.target);
        },

        clickPlayableCharacter = function (e) {
            _setObject(e.target);
        },

        mouseOverObject = function (e) {
            _displayObject(e.target);
        },

        mouseOutObject = function (e) {
            _undisplayObject(e.target);
        },

        clickObject = function (e) {
            _setObject(e.target);
        },

        mouseOverVerb = function (e) {
            _displayVerb(e.target);
        },

        mouseOutVerb = function (e) {
            _undisplayVerb(e.target);
        },

        clickVerb = function (e) {
            _setVerb(e.target);
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
        'clickVerb'        : clickVerb
    };
});