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

        this.name = 'condition.' + options.id;
        this.on = options.on;
        this.test = options.test;
        this.item = options.item;
        this.onSuccess = options.onSuccess;
        this.onFail    = options.onFail;

        this.performResult = function (result) {
            if (result && result.nowDo) {
                action.reset();
                require('engine/interaction/decision').performList(result.nowDo);
            }
        };

        this.doTest = function () {
            var result;

            switch (this.test) {

            case 'isInInventory':

                if (require('engine/panel/main').isInInventory(this.condition.item)) {
                    result = {conditionMet: true, nowDo: this.onSuccess};
                }
                result = {conditionMet: false, nowDo: this.onFail};
                break;

            case 'flag':
                if (require('engine/flags/main').get(this.flags.item) === true) {
                    result = {conditionMet: true, nowDo: this.onSuccess};
                }
                result = {conditionMet: false, nowDo: this.onFail};
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
