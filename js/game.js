function Game (options) {

	this.o = options;
	this.stage;
	this.queue;
	this.PC;
	this.canvasX;
	this.canvasY;
    this.clickedX;
	this.clickedY;
    this.attitude;

	this.renderMenu = function () {
		this.stage = new createjs.Stage("canvas");
		this.canvasX = $("#canvas").width();
		this.canvasY = $("#canvas").height();
		var text = new createjs.Text(this.o.title, "20px Arial", "#ff0000");
		text.x = 50; text.y=50;
		var bitmap = new createjs.Bitmap(this.queue.getResult(this.o.background));
		bitmap.scaleX = this.canvasX / bitmap.image.width;
		bitmap.scaleY = this.canvasY / bitmap.image.height;

		var PCdata = {
			images: [this.queue.getResult(this.o.PC.images)],
			frames: this.o.PC.frames,
			animations: this.o.PC.animations
		};
		var PCs = new createjs.SpriteSheet(PCdata);
		this.PC = new createjs.BitmapAnimation(PCs);
		this.PC.x = 0;
		this.PC.y = 230;
		this.attitude = 'standright';
		this.PC.gotoAndPlay(this.attitude);

		var wrapper = new createjs.Container();
		wrapper.addChild(bitmap, text, this.PC);

		this.stage.autoClear = false;
		this.stage.addChild(wrapper);
		this.stage.addEventListener("click", $.proxy(this.onClick, this));

		createjs.Ticker.setFPS(40);
		createjs.Ticker.addEventListener("tick", $.proxy(this.tick, this));
	};

    this.onClick = function(e) {
		this.clickedX = e.stageX;
		this.clickedY = e.stageY;
	}

	this.tick = function (event) {
		this.speed = 2;
		// attitudes
		if (this.PC.x > this.clickedX && (this.PC.x - this.clickedX > this.speed)) {
			this.attitude = "walkleft";
		} else if (this.PC.x < this.clickedX  && (this.clickedX - this.PC.x > this.speed)) {
            this.attitude = "walkright";
		} else {
			if (this.attitude == "walkleft") {
				this.attitude = "standleft";
			} else if (this.attitude == "walkright") {
				this.attitude ="standright";
			}
		}

		if (this.attitude == "walkleft") {
			this.PC.x -= this.speed;			
		} else if (this.attitude == "walkright") {
			this.PC.x += this.speed;
		}
		
		// change attitude only if it is different
		if (this.PC.currentAnimation != this.attitude) {
			this.PC.gotoAndPlay(this.attitude);
		}
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