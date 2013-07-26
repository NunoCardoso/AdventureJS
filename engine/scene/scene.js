/*global define, createjs */

/**
 * This module is a game Scene class
 */
define([
    'engine/character/main',
    'engine/config',
    'engine/lib/assets',
    'engine/object/main',
    'engine/panel/main',
    'engine/scene/background',
    'engine/scene/exit',
    'engine/scene/menubutton',
    'engine/sentence/main',
    'engine/cursor/main'
], function (
    gamecharacter,
    assets,
    config,
    gameobject,
    gamepanel,
    Background,
    Exit,
    MenuButton,
    sentence,
    gamecursor
) {
    var GameScene = function (options) {
        this.initialize(options);
    };

    var p = GameScene.prototype = new createjs.Container();
    p.GameScene_initialize = p.initialize;
    p.initialize = function (scene) {
        this.GameScene_initialize();


        this.name = scene.id;

        this.description  = scene.description;
        this.interactable = scene.interactable;

        // signaling a scene with playable character, not a menu scene
        this.playable     = true;
        this.ending       = scene.ending;
        this.pc           = scene.pc;
        this.npcs         = scene.npcs;
        this.background   = null;
        this.objects      = {};
        this.exits        = scene.exits || [];

        this.dynamic      = new createjs.Container();
        this.static       = new createjs.Container();
        this.menu         = new createjs.Container();

        var i;
        for (i in scene.objects) {
            this.objects[scene.objects[i].id] = scene.objects[i];
        }

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
            for (i in this.objects) {
                if (this.objects[i].id === object) {
                    index = i;
                }
            }
            if (index >= 0) {
                this.objects.splice(index, 1);
                var o = this.dynamic.getChildByName(object);
                if (o) {
                    this.dynamic.removeChild(o);
                }
            }
        };

        this.renderDynamic = function (options) {

            this.dynamic.removeAllChildren();
            var key, o, e, objectContainer = new createjs.Container();
            objectContainer.name = 'container.objects';

            // background
            if (this.background) {
                if (options.pc) {
                    // let background dictate the w and h. Needed to scroll the dynamic container
                    this.dynamic.w = this.background.w;
                    this.dynamic.h = this.background.h;
                }
                this.dynamic.addChild(this.background);
            }

            // objects
            for (key in this.objects) {
                o = gameobject.get(this.objects[key].id);
                o.renderAs('stage', this.objects[key]);
                objectContainer.addChild(o);
            }
            this.dynamic.addChild(objectContainer);

            // exits
            for (i = 0; i < this.exits.length; i++) {
                this.exits[i].from = scene.id;
                e = new Exit(this.exits[i]);
                this.dynamic.addChild(e);
            }

            // npcs
            if (scene.npcs) {
                for (i = 0; i < scene.npcs.length; i++) {
                    var _id = scene.npcs[i].id;
                    // set the npc position according to what the scene says
                    options.npcs[_id].setX(scene.npcs[i].position.x);
                    options.npcs[_id].setY(scene.npcs[i].position.y);
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
                if (options.pc_xy) {
                    options.pc.setX(options.pc_xy.x);
                    options.pc.setY(options.pc_xy.y);
                } else {
                // character is starting on a scene, get default x and y
                    options.pc.setX(this.pc.position.x);
                    options.pc.setY(this.pc.position.y);
                }
                this.static.addChild(options.pc);
            }

            this.addChild(this.static);
        };

        this.renderMenu = function (options) {
            if (this.isPlayable()) {
                var MenuButton = require('engine/scene/menubutton');
                this.menu.addChild(new MenuButton({from: this.name}));
            }
            // add the custom cursor
            this.menu.addChild(gamecursor.reset().get());
            this.addChild(this.menu);
        };

        this.render = function (options) {

            this.removeAllChildren();

            this.renderDynamic({
                'pc'   : gamecharacter.getPc(),
                'npcs' : gamecharacter.getNpcs()
            });

            gamepanel.renderForVerbsAndInventory();
            this.renderStatic({
                'panel'    : gamepanel.get(),
                'sentence' : sentence.get(),
                'pc'       : gamecharacter.getPc(),
                'pc_xy'    : options.pc_xy
            });

            this.renderMenu();
        };

        this.getMenuButton = function () {
            // have to return as an array, testHit and testClick likes arrays
            return [this.menu.children[0]];
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

        // really ugly
        this.getPc = function () {
            if (this.static.children) {
                return this.static.children[2];
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
            this.objects   = json.objects;
            this.dynamic.x = json.dynamic;
        };
    };
    return GameScene;
});
