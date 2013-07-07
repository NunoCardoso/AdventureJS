/*global define, createjs, $ */

define([
    'advgame/gamestage',
    'advgame/gameprops'
], function (gamestage, _) {

    var PC,

        renderCharacter = function (oPC, queue) {

            PC = new createjs.BitmapAnimation(
                new createjs.SpriteSheet({
                    images: [queue.getResult(oPC.images)],
                    frames: oPC.frames,
                    animations: oPC.animations
                })
            );
            PC.x = 0;
            PC.y = 230;
            PC.speed = 2;
            PC.attitude = 'standright';
            PC.gotoAndPlay(PC.attitude);
            _.set('pc', PC);
        },

        display = function () {
            var stage = gamestage.get();
            var pc = _.get('pc');
            var PcContainer = new createjs.Container();
            PcContainer.addChild(
                pc
            );
            stage.addChild(PcContainer);
            gamestage.set(stage);
        };

    return {
        'renderCharacter'  : renderCharacter,
        'display' : display
    };
});
