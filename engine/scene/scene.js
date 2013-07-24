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
    'engine/scene/menubutton',
    'engine/cursor/main'
], function (
    assets,
    config,
    gameobject,
    Background,
    Exit,
    MenuButton,
    gamecursor
) {
    var GameScene = function (options) {
        this.initialize(options);
    };

    var p = GameScene.prototype = new createjs.Container();
    p.GameScene_initialize = p.initialize;
    p.initialize = function (scene) {
        this.GameScene_initialize();

        this.name = 'scene.' + scene.id;

        this.description  = scene.description;
        this.interactable = scene.interactable;
        // this is not a menu scene, it is a scene with playable character
        this.playable     = true;

        this.ending       = scene.ending;
        this.pc           = scene.pc;
        this.npcs         = scene.npcs;
        this.background   = null;

        this.objects      = {};

        var i;
        for (i in scene.objects) {
            this.objects['object.' + scene.objects[i].id] = scene.objects[i];
        }

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

        this.isPlayable = function () {
            return this.playable;
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

            var objectContainer = new createjs.Container();
            objectContainer.name = 'container.objects';

            if (this.background) {
                if (options.pc) {
                    this.background.activateClickListener(options.pc);

                    // let background dictate the w and h. Needed to scroll the dynamic container
                    this.dynamic.w = this.background.w;
                    this.dynamic.h = this.background.h;
                }
                this.dynamic.addChild(this.background);
            }

            var key, o, e;

            for (key in this.objects) {
                o = gameobject.get('object.' + this.objects[key].id);
                o.renderAs('stage', this.objects[key]);
                if (options.pc) {
                    o.activateClickListener(options.pc);
                }
                objectContainer.addChild(o);
            }

            this.dynamic.addChild(objectContainer);

            for (i = 0; i < this.exits.length; i++) {
                this.exits[i].from = scene.id;
                e = new Exit(this.exits[i]);
                if (options.pc) {
                    e.activateClickListener(options.pc);
                }
                this.dynamic.addChild(e);
            }

            if (scene.npcs) {
                for (i = 0; i < scene.npcs.length; i++) {
                    var _id = scene.npcs[i].id;
                    // set the npc position according to what the scene says
                    options.npcs[_id].setX(scene.npcs[i].position.x);
                    options.npcs[_id].setY(scene.npcs[i].position.y);
                    // register the playable character, so they can talk.
                    options.npcs[_id].activateClickListener(
                        options.pc
                    );
                    this.dynamic.addChild(options.npcs[_id]);
                }
            }

            this.addChild(this.dynamic);
        };

        this.renderStatic = function (options) {

            var i;
            this.static.removeAllChildren();

            // first to be rendered. Watch out, getPanel() depends on it.
            if (options.panel) {
                this.static.addChild(options.panel);
            }

            if (options.sentence) {
                this.static.addChild(options.sentence);
            }

            if (options.pc) {

                // playable character in new scene - reset clickedXY.
                options.pc.resetTargetXY();

                // make it stand
                options.pc.stand();

                // character is exiting from a scene, add custom x and y
                if (options.characterPosition) {
                    options.pc.setX(options.characterPosition.x);
                    options.pc.setY(options.characterPosition.y);
                } else {
                // character is starting on a scene, get default x and y
                    options.pc.setX(this.pc.position.x);
                    options.pc.setY(this.pc.position.y);
                }
                this.static.addChild(options.pc);
            }

            if (this.name !== 'scene.menu' && this.name !== 'scene.start') {
                var MenuButton = require('engine/scene/menubutton');
                this.static.addChild(new MenuButton({from: this.name}));
            }
            this.addChild(this.static);
        };

        this.render = function (options) {
            this.renderDynamic({
                'pc'   : options.pc,
                'npcs' : options.npcs
            });

            this.renderStatic({
                'panel'    : options.panel,
                'sentence' : options.sentence,
                'pc'       : options.pc,
                'characterPosition'     : options.characterPosition
            });

            // add the custom cursor
            this.addChild(gamecursor.get());
        };

        this.getDynamicSceneChildrens = function () {
            return this.dynamic.children;
        };

        this.getPanel = function () {
            if (this.static.children) {
                return this.static.children[0];
            }
            return undefined;
        };

        this.getState = function () {
            var i, o,
                objectStates = {},
                objects = this.dynamic.getChildByName('container.objects');

            if (objects && objects.children) {
                for (i in objects.children) {
                    o = objects.children[i];
                    objectStates[o.name] = o.getState();
                }
            }
            return {
                'objects' : objectStates,
                'dynamic' : this.dynamic.x
            };
        };

        this.setState = function (json) {
            this.objects = json.objects;
            this.dynamic.x = json.dynamic;
        };
    };
    return GameScene;
});
