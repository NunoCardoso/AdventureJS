/*global define */

/**
 * This module handles interactions
 */
define([
    'engine/interaction/interaction'
], function (
    Interaction
) {

    var _ = [],

        _startsWith = function (string, patt) {
            return string.indexOf(patt) === 0;
        },

        preload = function (interactions) {
            var i;
            for (i = 0; i < interactions.length; i++) {
                _.push(new Interaction(interactions[i]));
            }
        },

        find = function (verb, first, second) {
            var i,
                firstname,
                secondname,
                found = [];

            for (i = 0; i < _.length; i++) {

                // check if verbs match
                if (_[i].verb === verb.text.text) {

                    // check if objects match.
                    // objects name are in a format like 'type'.'item', so that should be easy
                    firstname = _[i].first.item;
                    if (first.name === firstname) {

                        // if there is no second name, it is a match.
                        if (second === undefined && _[i].second === undefined) {

                            // wait... if object, let's see if it is in inventory
                            if (_[i].first.inInventory !== undefined) {
                                var isit = require('engine/panel/main').isInInventory(firstname);

                                if (_[i].first.inInventory === true && isit) {
                                    found.push(_[i]);
                                } else if (_[i].first.inInventory === false && !isit) {
                                    found.push(_[i]);
                                }
                            } else {
                                found.push(_[i]);
                            }
                        }

                        if (second !== undefined) {
                            // if there is a second name, test it.
                            secondname = _[i].second.item;
                            if (second.name === secondname) {
                                found.push(_[i]);
                            }
                        }
                    } else {
                        // maybe firstname matches second object, and secondname matches first object.
                        // test only if we have a valid second object
                        if (second !== undefined) {
                            secondname = _[i].second.item;
                            if ((first.name === secondname) && firstname === second.name) {
                                found.push(_[i]);
                            }
                        }
                    }
                }
            }
            return found;
        };

    return {
        'preload' : preload,
        'find'    : find
    };
});
