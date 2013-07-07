define([
	'advgame/game',
	'games/compass'
], function(Game, compass) {

    (function ($) {
     	$(function () {
    	    var game = new Game(compass);
   		    game.start();
	    });	
    }(jQuery));
})

