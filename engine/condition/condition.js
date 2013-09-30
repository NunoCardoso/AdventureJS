/*global define */

/**
 * This module is a game condition class
 */
define([
    'engine/interaction/action'
], function (
    action
) {
    var Condition = function (options) {

        this.id   = this.name = options.id;
        this.ifOn = options.ifOn;
        this.test = options.test;
        this.item = options.item;
        this.persistence = options.persistence;
        this.onSuccess = options.onSuccess;
        this.onFail    = options.onFail;
        this.executed  = false;

        this.performResult = function (result) {
            if (result && result.nowDo) {
                action.reset();
                require('engine/interaction/decision').performList({taskList: result.nowDo});
            }
        };

        this.doTest = function () {
            var result;

            switch (this.test) {

            case 'isInInventory':

                if (require('engine/panel/main').isInInventory(this.item)) {
                    result = {conditionMet: true, nowDo: this.onSuccess};
                } else {
                    result = {conditionMet: false, nowDo: this.onFail};
                }
                break;

            case 'flag':
                if (require('engine/flags/main').get(this.item) === true) {
                    result = {conditionMet: true, nowDo: this.onSuccess};
                } else {
                    result = {conditionMet: false, nowDo: this.onFail};
                }
                break;

            case 'alwaysTrue':
                result = {conditionMet: true, nowDo: this.onSuccess};
                break;
            }

            this.performResult(result);
        };
    };

    return Condition;
});
