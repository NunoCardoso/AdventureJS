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

        this.dynamic = new createjs.Container();
        this.static  = new createjs.Container();

        if (scene.background) {
            this.background = new Background({
                'background' : scene.background
            });
        }

        this.isInteractable = function () {
            return this.interactable;
        };

        this.removeObject = function (object) {
            var i, index;
            for (i = 0;  i < this.objects.length; i++) {
                if (this.objects[i].id === object) {
                    index = i;
                }
            }
            if (index >= 0) {
                this.objects.splice(index, 1);
                var o = this.dynamic.getChildByName('object.' + object);
                if (o) {
                    this.dynamic.removeChild(o);
                }
            }
        };

        this.renderDynamic = function (options) {

            // clean previous renderings
            this.removeAllChildren();
            this.dynamic.removeAllChildren();

            if (this.background) {
                if (options.playableCharacter) {
                    this.background.activateClickListener(options.playableCharacter);

                    // let background dictate the w and h. Needed to scroll the dynamic container
                    this.dynamic.w = this.background.w;
                    this.dynamic.h = this.background.h;
                }
                this.dynamic.addChild(this.background);
            }

            var i, o, e;

            for (i = 0; i < this.objects.length; i++) {
                o = gameobject.get(this.objects[i].id);
                o.renderAs('stage');
                o.setDimensions(this.objects[i]);
                if (options.playableCharacter) {
                    o.activateClickListener(options.playableCharacter);
                }
                this.dynamic.addChild(o);
            }

            for (i = 0; i < this.exits.length; i++) {
                this.exits[i].from = scene.id;
                e = new Exit(this.exits[i]);
                if (options.playableCharacter) {
                    e.activateClickListener(options.playableCharacter);
                }
                this.dynamic.addChild(e);
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
                    this.dynamic.addChild(options.nonPlayableCharacters[_id]);
                    this.dynamic.addChild(options.nonPlayableCharacters[_id].getLine());
                }
            }

            this.addChild(this.dynamic);
        };

        this.renderStatic = function (options) {

            var i;
            this.static.removeAllChildren();

            if (options.panel) {
                this.static.addChild(options.panel);
            }

            if (options.sentence) {
                this.static.addChild(options.sentence);
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
                this.static.addChild(options.playableCharacter);
                this.static.addChild(options.playableCharacter.getLine());
            }


            if (this.name !== 'scene.menu' && this.name !== 'scene.start') {
                var MenuButton = require('engine/scene/menubutton');
                this.static.addChild(new MenuButton({from: this.name}));
            }
            this.addChild(this.static);
        };
    };
    return GameScene;
});
