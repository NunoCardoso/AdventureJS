/*global define, createjs */

/**
 * This module is a game Scene class
 */
define([
    'engine/character/main',
    'engine/config',
    'engine/exit/main',
    'engine/lib/assets',
    'engine/object/main',
    'engine/panel/main',
    'engine/scene/background',
    'engine/scene/menubutton',
    'engine/sentence/main',
    'engine/cursor/main'
], function (
    gamecharacter,
    config,
    gameexit,
    assets,
    gameobject,
    gamepanel,
    Background,
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
        this.music        = scene.music;
        this.background   = undefined;
        this.objects      = {};
        this.exits        = scene.exits || [];
        this.startXY      = undefined;
        this.beginCutscene = scene.beginCutscene || undefined;
        this.beginCutscenePerformed = false;

        this.dynamicBack  = new createjs.Container();
        this.player       = new createjs.Container();
        this.dynamicFore  = new createjs.Container();
        this.staticBack   = new createjs.Container();

        // used to parallax the background; 
        this.backgroundOffset = 0;

        this.scenePc     = undefined;
        this.sceneNpcs   = undefined;

        var i;
        for (i in scene.objects) {
            this.objects[scene.objects[i].id] = scene.objects[i];
        }

        if (scene.background) {
            this.background = new Background({
                'background'     : scene.background,
                'backgroundpath' : scene.backgroundpath,
                'backgroundmode' : scene.backgroundmode
            });
        }

        this.hasExit = function (_exit) {
            var i;
            for (i in this.exits) {
                if (this.exits[i].exit === _exit) {
                    return _exit;
                }
            }
            return undefined;
        };

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
                var o;
                if (this.objects.onForeground) {
                    o = this.dynamicFore.getChildByName(object);
                    if (o) {
                        this.dynamicFore.removeChild(o);
                    }
                } else {
                    o = this.dynamicBack.getChildByName(object);
                    if (o) {
                        this.dynamicBack.removeChild(o);
                    }
                }
            }
        };

        this.addObject = function (object) {
            this.objects[object.id] = object;
        };

        this.doMove = function (delta) {
            this.dynamicBack.x = this.backgroundOffset;
            this.dynamicFore.x = this.backgroundOffset;
            this.player.x      = this.backgroundOffset;
            //if (this.scenePc && this.scenePc.targetXY) {
                // fix character's targetXY if there is one
                //this.scenePc.targetXY.x -= delta;
            //}
        };

        // when dragging backgrounds
        this.move = function (diffX) {
            var proceed = false;
            // check if we have spare scene on the left.
            if (diffX > 0 && this.background.mode !== 'fit' && this.backgroundOffset < 0) {
                proceed = true;
                // make sure that it doesn't drag outbounds
                if (this.backgroundOffset + diffX > 0) {
                    diffX = -this.backgroundOffset;
                }
            }

            // background might be scaled off, so let's check
            backgroundWidth = this.dynamicBack.w;
            if (this.getBackground().children[0].scaleX) {
                backgroundWidth *= this.getBackground().children[0].scaleX;
            }

            // check if we have space scene on the right
            if (diffX < 0 && this.background.mode !== 'fit' && (this.backgroundOffset + backgroundWidth > config.get('game.w'))) {
                proceed = true;
                // make sure that it doesn't drag outbounds
                if (this.backgroundOffset + backgroundWidth + diffX < config.get('game.w')) {
                    diffX = config.get('game.w') - this.backgroundOffset - backgroundWidth;
                }
            }
            if (proceed) {
                this.backgroundOffset += diffX;
                this.doMove(diffX);
            }
        };

        this.renderDynamic = function (options) {

            this.dynamicBack.removeAllChildren();
            this.dynamicFore.removeAllChildren();
            var key, o, e,
                objectContainerBack = new createjs.Container(),
                objectContainerFore = new createjs.Container();

            objectContainerBack.name = 'container.objects';
            objectContainerFore.name = 'container.objects';

            // background
            if (this.background) {
                if (options.pc) {
                    // let background dictate the w and h. Needed to scroll the dynamic container
                    this.dynamicBack.w = this.background.w;
                    this.dynamicBack.h = this.background.h;
                    this.dynamicFore.w = this.background.w;
                    this.dynamicFore.h = this.background.h;
                }
                this.dynamicBack.addChild(this.background);
            }

            // objects
            this.sceneObjects = [];
            for (key in this.objects) {
                o = gameobject.get(this.objects[key].id);
                o.renderAs('stage', this.objects[key]);
                if (o.onForeground) {
                    objectContainerFore.addChild(o);
                } else {
                    objectContainerBack.addChild(o);
                }
            }
            this.dynamicBack.addChild(objectContainerBack);
            this.dynamicFore.addChild(objectContainerFore);

            // exits
            var i;
            for (i in this.exits) {
                // I have to load the Exit from gameexit,
                // then render for this scene's exit params.
                e = gameexit.get(this.exits[i].exit);
                e.render(this.exits[i]);
                if (!this.toExit && e.role === 'begin') {
                    this.startXY = {
                        x : e.xx + e.w / 2,
                        y : e.yy + e.h
                    };
                }
                this.dynamicBack.addChild(e);
            }


            // if this scene does not have a begin exit,
            // then let's check the toExit.
            if (!this.startXY) {
                for (i in this.exits) {
                    if (this.exits[i].exit === this.toExit) {
                        e = this.dynamicBack.getChildByName(this.toExit);
                        this.startXY = {
                            x : e.xx + e.w / 2,
                            y : e.yy + e.h
                        };
                    }
                }
            }

            // npcs
            this.sceneNpcs = [];
            if (scene.npcs) {
                for (i = 0; i < scene.npcs.length; i++) {
                    var _id = scene.npcs[i].id;
                    // set the npc position according to what the scene says
                    options.npcs[_id].setX(scene.npcs[i].position.x);
                    options.npcs[_id].setY(scene.npcs[i].position.y);
                    this.dynamicBack.addChild(options.npcs[_id]);
                    this.sceneNpcs.push(options.npcs[_id]);
                }
            }
        };

        this.renderPlayer = function (options) {

            var i;
            this.player.removeAllChildren();

            this.scenePc = undefined;
            if (options.pc) {

                // playable character in new scene - reset clickedXY.
                options.pc.resetTargetXY();

                // make it stand
                options.pc.stand();

                // character is exiting from a scene, add custom x and y

                if (this.startXY) {
                    options.pc.setX(this.startXY.x);
                    options.pc.setY(this.startXY.y);
                } else {
                    console.log('startXY should be defined!');
                }
                this.player.addChild(options.pc);
                this.scenePc = options.pc;
            }
        };

        this.renderStatic = function (options) {

            if (require('engine/stage/main').isPlayable()) {
                // first to be rendered. Watch out, getPanel() depends on it.
                if (options.panel) {
                    this.staticBack.addChild(options.panel);
                }

                if (options.sentence) {
                    this.staticBack.addChild(options.sentence);
                }

                var MenuButton = require('engine/scene/menubutton');
                this.staticBack.addChild(new MenuButton({from: this.name}));

                // add the custom cursor
                gamecursor.reset();
                this.staticBack.addChild(gamecursor.get());
            }
        };

        this.render = function (options) {

            this.toExit = (options ? options.toExit : undefined);
            this.startXY = undefined;

            this.removeAllChildren();

            this.renderDynamic({
                'pc'   : gamecharacter.getPc(),
                'npcs' : gamecharacter.getNpcs()
            });

            if (require('engine/stage/main').isPlayable()) {
                gamepanel.renderForVerbsAndInventory();
            }
            this.renderStatic({
                'panel'    : gamepanel.get(),
                'sentence' : sentence.get()
            });

            this.renderPlayer({
                'pc'       : gamecharacter.getPc()
            });

            this.addChild(this.dynamicBack);
            this.addChild(this.player);
            this.addChild(this.dynamicFore);
            this.addChild(this.staticBack);

        };

        this.getMenuButton = function () {
            // have to return as an array, testHit and testClick likes arrays
            return [this.staticBack.getChildByName('menubutton')];
        };

        this.getDynamicBackSceneChildrens = function () {
            return this.dynamicBack.children;
        };

        this.getDynamicForeSceneChildrens = function () {
            return this.dynamicFore.children;
        };

        this.getPanel = function () {
            if (this.staticBack.children) {
                return this.staticBack.children[0];
            }
            return undefined;
        };

        this.getPc = function () {
            return this.scenePc;
        };

        this.getNpcs = function () {
            return this.sceneNpcs;
        };

        this.getBackground = function () {
            return this.dynamicBack.getChildByName('background');
        };

        this.getState = function () {
            var i, o,
                objectStates = {},
                objectsBack = this.dynamicBack.getChildByName('container.objects'),
                objectsFore = this.dynamicFore.getChildByName('container.objects');

            if (objectsBack && objectsBack.children) {
                for (i in objectsBack.children) {
                    o = objectsBack.children[i];
                    objectStates[o.name] = o.getState();
                }
            }
            if (objectsFore && objectsFore.children) {
                for (i in objectsFore.children) {
                    o = objectsFore.children[i];
                    objectStates[o.name] = o.getState();
                }
            }
            return {
                'objects'     : objectStates,
                'backgroundOffset' : this.backgroundOffset,
                'player'      : this.player.x
            };
        };

        this.hasBeginCutscene = function () {
            return this.beginCutscene !== undefined;
        };

        this.performBeginCutscene = function () {
            if (this.beginCutscenePerformed) {
                return;
            }
            gamecursor.setBusy();
            var deferred = require('engine/interaction/decision').performList(this.beginCutscene);
            deferred.done(function () {
                gamecursor.setNotBusy();
            });
            this.beginCutscenePerformed = true;
        };

        this.setState = function (json) {
            this.objects       = json.objects;
            this.backgroundOffset = json.backgroundOffset;
            this.player.x      = json.player;

            // apply the offset
            this.doMove(0);
        };
    };
    return GameScene;
});
