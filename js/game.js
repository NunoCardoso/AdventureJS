function Game (options) {

	this.o = options;
	this.stage;
	this.queue;
	this.PC;

	this.renderMenu = function () {
		this.stage = new createjs.Stage("canvas");
		var canvasX = $("#canvas").width();
		var canvasY = $("#canvas").height();
		var text = new createjs.Text(this.o.title, "20px Arial", "#ff0000");
		text.x = 50; text.y=50;
		var bitmap = new createjs.Bitmap(this.queue.getResult(this.o.background));
		bitmap.scaleX = canvasX / bitmap.image.width;
		bitmap.scaleY = canvasY / bitmap.image.height;

		var PCdata = {
			images: [this.queue.getResult(this.o.PC.images)],
			frames: this.o.PC.frames,
			animations: this.o.PC.animations
		};
		var PCs = new createjs.SpriteSheet(PCdata);
		this.PC = new createjs.BitmapAnimation(PCs);
		this.PC.x=100;
		this.PC.y=230;
		this.PC.gotoAndPlay("walkright");
		var wrapper = new createjs.Container();
		wrapper.addChild(bitmap);
		wrapper.addChild(text);
		wrapper.addChild(this.PC);
		this.stage.addChild(wrapper);

		createjs.Ticker.setFPS(40);
		createjs.Ticker.addEventListener("tick", $.proxy(this.tick, this));
	};


	this.tick = function (event) {

		this.PC.x += 2;
		this.stage.update(event);
	}


	this.preloadImages = function () {
		this.queue = new createjs.LoadQueue();
		this.queue.addEventListener("complete", $.proxy(this.onPreloadComplete, this));
		var manifest = [];
		for (var key in this.o.images) {
			if (this.o.images.hasOwnProperty(key)) {
				manifest.push({
				   'id': key,
				   'src' : this.o.images[key]
				});
			}
		}
		this.queue.loadManifest(manifest);
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