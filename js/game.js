function Game (options) {

	this.o = options;
	this.stage;
	this.queue;

	this.renderMenu = function () {
		this.stage = new createjs.Stage("canvas");
		var canvasX = $("#canvas").width();
		var canvasY = $("#canvas").height();
		var text = new createjs.Text(this.o.title, "20px Arial", "#ff0000");
		text.x = 50; text.y=50;
		var bitmap = new createjs.Bitmap(this.queue.getResult("background01"));
		bitmap.scaleX = canvasX / bitmap.image.width;
		bitmap.scaleY = canvasY / bitmap.image.height;

		var wrapper = new createjs.Container();
		wrapper.addChild(bitmap);
		wrapper.addChild(text);
		this.stage.addChild(wrapper);

		//Update stage will render next frame
		this.stage.update();
	};


	this.preloadImages = function () {
		this.queue = new createjs.LoadQueue();
		this.queue.addEventListener("complete", $.proxy(this.onPreloadComplete, this));
		this.queue.loadManifest([
		   	{id: "background01", 
             src:this.o.background}
	    ]);
	};

    this.onPreloadComplete = function () {
 		console.log('Images loaded');
        this.renderMenu();
	};

	this.start = function () {
		this.preloadImages();
	};
}

(function ($) {
	$(function () {
    	var game = new Game(gamejson);
   		game.start();
	});	
}(jQuery));