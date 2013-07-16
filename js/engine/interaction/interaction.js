/*global define, createjs, $ */

/**
 * This module is a game interaction class
 */
define([
], function (
) {
    var Interaction = function (options) {
        this.initialize(options);
    };

    Interaction.prototype = new createjs.Bitmap();
    Interaction.prototype.Interaction_initialize = Interaction.prototype.initialize;
    Interaction.prototype.initialize = function (options) {
        this.Interaction_initialize();
        this.name = options.id;
        this.verb = options.verb;
        this.first = options.first;
        this.second = options.second;
        this.actions = options.actions;
    };
    return Interaction;
});
/*

            {
                'id' : 'interaction01',
                'verb' : 'Use',
                'first': {
                    'type' : 'object',
                    'item' : 'needle01',
                    'inInventory' : true
                },
                'second' : {
                    'type' : 'object',
                    'item' : 'cork01',
                    'inInventory' : true
                },
                'actions' : [
                    {
                        'action': 'removeFromInventory',
                        'target': 'needle01'
                    },
                    {
                        'action': 'removeFromInventory',
                        'target': 'cork01'
                    },
                    {
                        'action': 'addToInventory',
                        'target': 'corkwithneedle01'
                    },
                    {
                        'action': 'dialogMessage',
                        'target': 'you01',
                        'param' : 'I stuck the needle into the cork'
                    }
                ]
            },
            {
                'id' : 'interaction02',
                'verb' : 'Talk to',
                'first' : {
                    'type' : 'character',
                    'item' : 'pirate01'
                },
                'actions' : [
                    {
                        'action': 'playDialog',
                        'target': 'dialog01'
                    }
                ]
            },
            {
                'id' : 'interaction03',
                'verb' : 'Push',
                'first': {
                    'type' : 'object',
                    'item' : 'winebottle01',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action': 'dialogMessage',
                        'target': 'you01',
                        'param' : 'I can\'t push a wine bottle!'
                    }
                ]
            }
            */