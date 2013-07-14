/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/assets',
    'engine/gameconfig',
    'engine/gamestage',
    'engine/character/main',
    'engine/object/main'
], function (
    assets,
    gameconfig,
    gamestage,
    playablecharacter,
    gameobject
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

/*        if (scene.playableCharacter) {
            this.playableCharacter   = playablecharacter.get();
            this.playableCharacter.x = scene.playableCharacter.position.x;
            this.playableCharacter.y = scene.playableCharacter.position.y;
        }
*/
        // if scene has background... (start scene does not have one)
        if (scene.background) {
            this.background = new createjs.Bitmap(
                assets.getQueueLoaded().getResult(scene.background)
            );
            this.background.scaleX = gameconfig.get('game.w') / this.background.image.width;
            this.background.scaleY = gameconfig.get('game.h') / this.background.image.height;

            if (this.interactable && scene.playableCharacter) {
                this.background.addEventListener("click", $.proxy(function (e) {
                    console.log("main menu background click!");
                    this.playableCharacter.setClickedXY({x : e.stageX, y : e.stageY});
                }, this));
            }

            this.addChild(this.background);
        }

        var i;

        if (scene.objects) {
            this.objects = [];
            for (i = 0; i < scene.objects.length; i++) {
                var o = gameobject.get(scene.objects[i].id);
                o.renderAs('stage');
                o.setDimensions(scene.objects[i]);
                o.addListeners();
                this.addChild(o);
            }
        }

        if (scene.exits) {
            this.exits = [];
            for (i = 0; i < scene.exits.length; i++) {
                console.log("TODO");
    //            this.exits[i] = new Exit(scene.exits[i]);
            }
        }

        if (scene.playableCharacter) {
            this.addChild(this.playableCharacter);
        }

        if (this.interactable) {
            this.addChild(gamestage.getConsole());
        }
    };
    return GameScene;
});
