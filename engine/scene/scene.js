/*global define, createjs */

/**
 * This module is a game Scene class
 */
define([
    'engine/character/main',
    'engine/condition/main',
    'engine/config',
    'engine/exit/exit',
    'engine/lib/assets',
    'engine/object/main',
    'engine/panel/main',
    'engine/scene/background',
    'engine/scene/menubutton',
    'engine/scene/helpbutton',
    'engine/cursor/main'
], function (
    gamecharacter,
    gamecondition,
    config,
    Exit,
    assets,
    gameobject,
    gamepanel,
    Background,
    MenuButton,
    HelpButton,
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
        this.conditions   = {};

        this.exits        = scene.exits || [];
        this.startXY      = undefined;
        this.beginCutscene = scene.beginCutscene || undefined;
        this.beginCutscenePerformed = false;

        this.dynamicBack   = new createjs.Container();
        this.dynamicMiddle = new createjs.Container();
        this.dynamicFore   = new createjs.Container();

        this.dynamicContainer = new createjs.Container();
        this.staticContainer  = new createjs.Container();

        this.backgroundname = scene.background;
        this.backgroundpath = scene.backgroundpath;
        this.backgroundmode = scene.backgroundmode;

        // used to parallax the background; 
        this.backgroundOffset = 0;

        this.scenePc     = undefined;
        this.sceneNpcs   = undefined;

        this.targetCursor = undefined;

        // this is the background width, with scale effect.
        this.backgroundWidth = undefined;

        var i;
        for (i in scene.objects) {
            this.objects[scene.objects[i].id] = scene.objects[i];
        }

        for (i in scene.conditions) {
            var condition = gamecondition.get(scene.conditions[i]);
            this.conditions[condition.id] = condition;
        }

        this.setBackground = function () {
            this.background = new Background({
                'background'     : this.backgroundname,
                'backgroundpath' : this.backgroundpath,
                'backgroundmode' : this.backgroundmode
            });
        };

        if (scene.background) {
            this.setBackground();
        }

        this.hasExit = function (_exit) {
            var i;
            for (i in this.exits) {
                if (this.exits[i].id === _exit) {
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

        this.applyOffset = function () {
            this.dynamicContainer.x = this.backgroundOffset;
            this.background.path.x = -this.backgroundOffset;
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

            // check if we have space scene on the right
            if (diffX < 0 && this.background.mode !== 'fit' && (this.backgroundOffset + this.backgroundWidth > config.get('game.w'))) {
                proceed = true;
                // make sure that it doesn't drag outbounds
                if (this.backgroundOffset + this.backgroundWidth + diffX < config.get('game.w')) {
                    diffX = config.get('game.w') - this.backgroundOffset - this.backgroundWidth;
                }
            }
            if (proceed) {
                this.backgroundOffset += diffX;
                this.applyOffset();
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
                e = new Exit(this.exits[i]);

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
                    if (this.exits[i].id === this.toExit) {
                        e = this.dynamicBack.getChildByName(this.toExit);
                        this.startXY = {
                            x : e.xx + e.w / 2,
                            y : e.yy + e.h
                        };
                    }
                }
            }

            // update scene's background width.
            this.backgroundWidth = this.dynamicBack.w;
            if (this.getBackground().children[0].scaleX) {
                this.backgroundWidth *= this.getBackground().children[0].scaleX;
            }
        };

        this.setTargetCursorXY = function (xy) {
            if (this.targetCursor) {
                this.targetCursor.x = xy.x;
                this.targetCursor.y = xy.y;
            }
        };

        this.renderMiddle = function (options) {

            var i;
            this.dynamicMiddle.removeAllChildren();

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
                this.dynamicMiddle.addChild(options.pc);
                this.scenePc = options.pc;
            }

            // npcs
            this.sceneNpcs = [];
            if (options.npcs) {
                for (i = 0; i < scene.npcs.length; i++) {
                    var _id = scene.npcs[i].id;
                    // set the npc position according to what the scene says
                    options.npcs[_id].setX(scene.npcs[i].position.x);
                    options.npcs[_id].setY(scene.npcs[i].position.y);
                    this.dynamicMiddle.addChild(options.npcs[_id]);
                    this.sceneNpcs.push(options.npcs[_id]);
                }
            }

            var t = gamecursor.getTarget();
            this.dynamicMiddle.addChild(t);
            this.targetCursor = t;
        };

        this.checkCharacterZ = function () {
            var l = this.dynamicMiddle.children.length;
            if (l > 1) {
                for (var i = 0; i < l - 1; i++) {
                    for (var j = i + 1; j < l; j++) {
                        if (this.dynamicMiddle.children[i].y > this.dynamicMiddle.children[j].y) {
                            var temp = this.dynamicMiddle.children[i];
                            this.dynamicMiddle.children[i] = this.dynamicMiddle.children[j];
                            this.dynamicMiddle.children[j] = temp;
                        }
                    }
                }
            }
        };

        this.renderStatic = function (options) {
            this.staticContainer.removeAllChildren();

            if (require('engine/stage/main').isPlayable()) {
                // first to be rendered. Watch out, getPanel() depends on it.
                if (options.panel) {
                    this.staticContainer.addChild(options.panel);
                }

                this.staticContainer.addChild(new MenuButton({from: this.name}));
                this.staticContainer.addChild(new HelpButton());

                // add the custom cursor
                gamecursor.reset();
                this.staticContainer.addChild(gamecursor.get());
            }
        };

        this.hasBeginCutscene = function () {
            return this.beginCutscene !== undefined;
        };

        this.render = function (options) {

            this.toExit = (options ? options.toExit : undefined);
            this.startXY = undefined;

            this.removeAllChildren();

            this.renderDynamic({
                'pc' : gamecharacter.getPc()
            });

            if (require('engine/stage/main').isPlayable()) {
                if (this.hasBeginCutscene() && !this.beginCutscenePerformed) {
                    gamepanel.renderForCutscene();
                } else {
                    gamepanel.renderForVerbsAndInventory();
                }
            }

            this.renderStatic({
                'panel'    : gamepanel.get()
            });

            this.renderMiddle({
                'pc'   : gamecharacter.getPc(),
                'npcs' : gamecharacter.getNpcs()
            });

            this.dynamicContainer.addChild(this.dynamicBack);
            this.dynamicContainer.addChild(this.dynamicMiddle);
            this.dynamicContainer.addChild(this.dynamicFore);

            this.addChild(this.dynamicContainer);
            this.addChild(this.staticContainer);
        };

        this.getMenuButton = function () {
            // have to return as an array, testHit and testClick likes arrays
            return [this.staticContainer.getChildByName('menubutton')];
        };

        this.getHelpButton = function () {
            // have to return as an array, testHit and testClick likes arrays
            return [this.staticContainer.getChildByName('helpbutton')];
        };

        this.getDynamicBackSceneChildrens = function () {
            return this.dynamicContainer.children[0].children;
        };

        this.getDynamicMiddleChildrens = function () {
            return this.dynamicContainer.children[1].children;
        };

        this.getDynamicForeSceneChildrens = function () {
            return this.dynamicContainer.children[2].children;
        };

        this.getPanel = function () {
            if (this.staticContainer.children) {
                return this.staticContainer.children[0];
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
            return this.background;
        };

        this.getState = function () {
            return {
                'objects'          : this.objects,
                'backgroundOffset' : this.backgroundOffset,
                'backgroundname'   : this.backgroundname,
                'backgroundpath'   : this.backgroundpath,
                'backgroundmode'   : this.backgroundmode,
                'beginCutscenePerformed' : this.beginCutscenePerformed
            };
        };

        this.performBeginCutscene = function () {
            if (this.beginCutscenePerformed) {
                return;
            }
            gamecursor.setBusy();
            require('engine/panel/main').renderForCutscene();
            require('engine/stage/main').update();
            require('engine/interaction/decision').performList({
                taskList: this.beginCutscene,
                whenDone: function () {
                    gamecursor.setNotBusy();
                    require('engine/panel/main').renderForVerbsAndInventory();
                }
            });
            this.beginCutscenePerformed = true;
        };

        this.setState = function (json) {
            this.objects = json.objects;
            this.backgroundname = json.backgroundname;
            this.backgroundpath = json.backgroundpath;
            this.backgroundmode = json.backgroundmode;
            this.backgroundOffset = json.backgroundOffset;
            this.beginCutscenePerformed = json.beginCutscenePerformed;

            // set background, apply the offset, render scene
            this.setBackground();
            this.applyOffset();
            this.render();
        };

        this.fadeIn = function () {
            var self = this;
            var gamestage = require('engine/stage/main').get();
            this.alpha = 0;
            var d = $.Deferred();

            var inter = setInterval(function () {
                self.alpha += 0.1;
                gamestage.update();
                if (self.alpha > 0.95) {
                    clearInterval(inter);
                    d.resolve();
                }
            }, 50);
            return d;
        };

        this.fadeOut = function () {
            var self = this;
            var gamestage = require('engine/stage/main').get();
            this.alpha = 1;
            var d = $.Deferred();

            var inter = setInterval(function () {
                self.alpha -= 0.1;
                gamestage.update();
                if (self.alpha < 0.05) {
                    clearInterval(inter);
                    d.resolve();
                }
            }, 50);
            return d;
        };
    };
    return GameScene;
});
