/*global define, createjs */

/**
 * This module is a game Scene class
 */
define([
    'engine/config',
    'engine/lib/assets',
    'engine/object/main',
    'engine/scene/background',
    'engine/scene/exit',
    'engine/scene/menubutton'
], function (
    assets,
    config,
    gameobject,
    Background,
    Exit,
    MenuButton
) {
    var GameScene = function (options) {
        this.initialize(options);
    };

    GameScene.prototype = new createjs.Container();
    GameScene.prototype.GameScene_initialize = GameScene.prototype.initialize;
    GameScene.prototype.initialize = function (scene) {
        this.GameScene_initialize();
        this.name = 'scene.' + scene.id;

        this.description  = scene.description;
        this.interactable = scene.interactable;
        this.ending       = scene.ending;
        this.playableCharacter = scene.playableCharacter;
        this.nonPlayableCharacters = scene.nonPlayableCharacters;
        this.background   = null;

        this.objects      = scene.objects || [];
        this.exits        = scene.exits || [];

        if (scene.background) {
            this.background = new Background({
                'background' : scene.background
            });
        }

        this.isInteractable = function () {
            return this.interactable;
        };

        this.render = function (options) {

            // clean previous renderings
            this.removeAllChildren();

            if (this.background) {
                if (options.playableCharacter) {
                    this.background.activateClickListener(options.playableCharacter);
                }
                this.addChild(this.background);
            }

            var i, o, e;

            for (i = 0; i < this.objects.length; i++) {
                o = gameobject.get(this.objects[i].id);
                o.renderAs('stage');
                o.setDimensions(this.objects[i]);
                if (options.playableCharacter) {
                    o.activateClickListener(options.playableCharacter);
                }
                this.addChild(o);
            }

            for (i = 0; i < this.exits.length; i++) {
                this.exits[i].from = scene.id;
                e = new Exit(this.exits[i]);
                if (options.playableCharacter) {
                    e.activateClickListener(options.playableCharacter);
                }
                this.addChild(e);
            }

            if (options.panel) {
                this.addChild(options.panel);
            }

            if (options.sentence) {
                this.addChild(options.sentence);
            }

            if (scene.nonPlayableCharacters) {
                for (i = 0; i < scene.nonPlayableCharacters.length; i++) {
                    var _id = scene.nonPlayableCharacters[i].id;
                    // set the npc position according to what the scene says
                    options.nonPlayableCharacters[_id].setX(scene.nonPlayableCharacters[i].position.x);
                    options.nonPlayableCharacters[_id].setY(scene.nonPlayableCharacters[i].position.y);
                    // register the playable character, so they can talk.
                    options.nonPlayableCharacters[_id].activateClickListener(
                        options.playableCharacter
                    );
                    this.addChild(options.nonPlayableCharacters[_id]);
                    this.addChild(options.nonPlayableCharacters[_id].getLine());
                }
            }

            if (options.playableCharacter) {

                // playableCharacter in new scene - reset clickedXY.
                options.playableCharacter.resetTargetXY();

                // make it stand
                options.playableCharacter.stand();

                // character is exiting from a scene, add custom x and y
                if (options.characterPosition) {
                    options.playableCharacter.setX(options.characterPosition.x);
                    options.playableCharacter.setY(options.characterPosition.y);
                } else {
                // character is starting on a scene, get default x and y
                    options.playableCharacter.setX(this.playableCharacter.position.x);
                    options.playableCharacter.setY(this.playableCharacter.position.y);
                }
                this.addChild(options.playableCharacter);
                this.addChild(options.playableCharacter.getLine());
            }


            if (this.name !== 'scene.menu' && this.name !== 'scene.start') {
                var Xxx = require('engine/scene/menubutton')
                this.addChild(new Xxx({from: this.name}));
            }

        };
    };
    return GameScene;
});
