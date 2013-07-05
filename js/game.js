function Game (options) {

	this.o = options;
	this.stage;
	this.queue;
	this.canvasX;
	this.canvasY;
    this.clickedX;
	this.clickedY;
	this.speed = 2;
	this._ = {};

	this.renderMenu = function () {

		this.stage = new createjs.Stage("canvas");
		this.canvasX = $("#canvas").width();
		this.canvasY = $("#canvas").height();

		this._.main = {};

		// Title
		this._.main.title = new createjs.Text(this.o.main.title, "20px Arial", "#FFFFFF");
		this._.main.title.textAlign = "center";
		this._.main.title.textBaseline = "middle";
		this._.main.title.x = this.canvasX / 2;
		this._.main.title.y = 20;

		// Author
		this._.main.author = new createjs.Text(this.o.main.author, "17px Arial", "#CCCCCC");
		this._.main.author.textAlign = "center";
		this._.main.author.textBaseline = "middle";
     	this._.main.author.x = this.canvasX / 2;
		this._.main.author.y = 50;

		// Description
		this._.main.description = new createjs.Text(this.o.main.description, "14px Arial", "#FFFFFF");
        this._.main.description.textAlign = "center";
        this._.main.description.textBaseline = "middle";
        this._.main.description.x = this.canvasX / 2;
        this._.main.description.y = 100;

		// Main Background
		this._.main.background = new createjs.Bitmap(this.queue.getResult(this.o.main.background));
		this._.main.background.scaleX = this.canvasX / this._.main.background.image.width;
		this._.main.background.scaleY = this.canvasY / this._.main.background.image.height;

		// start button
		this._.main.startButton = new createjs.Shape();
		this._.main.startButton.name = "startButton";
		width = 200;
		x = this.canvasX / 2 - width / 2;
		y = 150;
		height = 60;
		round = 10;
		this._.main.startButton.graphics.beginFill("red").drawRoundRect(x, y, width, height, round);
		
		// start button label
		this._.main.startButtonLabel = new createjs.Text("start game!", "bold 24px Arial", "#FFFFFF");
		this._.main.startButtonLabel.textAlign = "center";
		this._.main.startButtonLabel.textBaseline = "middle";
		this._.main.startButtonLabel.x = this.canvasX / 2;
		this._.main.startButtonLabel.y = 150 + height / 2;

		// objects

		// PC
		this._.PC = new createjs.BitmapAnimation(
			new createjs.SpriteSheet({
			    images: [this.queue.getResult(this.o.PC.images)],
     			frames: this.o.PC.frames,
		     	animations: this.o.PC.animations
     		})
        );
		this._.PC.x = 0;
		this._.PC.y = 230;
		this._.PC.attitude = 'standright';
		this._.PC.gotoAndPlay(this._.PC.attitude);
		
		// stage build		
		var bottom = new createjs.Container();
		var middle = new createjs.Container();

		bottom.addChild(
           this._.main.background,
           this._.main.title,
		   this._.main.author,
		   this._.main.description
    	);

		middle.addChild(
		   this._.main.startButton,
		   this._.main.startButtonLabel,
		   this._.PC
	  	);

		this.stage.autoClear = false;
		this.stage.addChild(bottom);
		this.stage.addChild(middle);
		
		// listener on stage
		// mousedown allows press event on objects above the stage to be captured
		this.stage.addEventListener("mousedown", $.proxy(this.onStageMouseDown, this));
		
		// listener on button 
		this._.main.startButton.addEventListener("press", $.proxy(this.onStartButtonPress, this));

		this._.main.startButton.addEventListener("mouseover", $.proxy(this.onStartButtonMouseOver, this));

		// ticker
		createjs.Ticker.setFPS(40);
		createjs.Ticker.addEventListener("tick", $.proxy(this.onTick, this));
	};

    this.onStartButtonPress = function (e) {
		console.log("start button press!")
	}

    this.onStartButtonMouseOver = function (e) {
		console.log("start button mouse over!")
	}

    this.onStageMouseDown = function(e) {
		console.log("stage click!")
		this.clickedX = e.stageX;
		this.clickedY = e.stageY;
	}

	this.onTick = function (event) {
		// attitudes
		if (this._.PC.x > this.clickedX && (this._.PC.x - this.clickedX > this.speed)) {
			this._.PC.attitude = "walkleft";
		} else if (this._.PC.x < this.clickedX  && (this.clickedX - this._.PC.x > this.speed)) {
            this._.PC.attitude = "walkright";
		} else {
			if (this._.PC.attitude == "walkleft") {
				this._.PC.attitude = "standleft";
			} else if (this._.PC.attitude == "walkright") {
				this._.PC.attitude ="standright";
			}
		}
		if (this._.PC.attitude == "walkleft") {
			this._.PC.x -= this.speed;			
		} else if (this._.PC.attitude == "walkright") {
			this._.PC.x += this.speed;
		}
		
		// change attitude only if it is different
		if (this._.PC.currentAnimation != this._.PC.attitude) {
			this._.PC.gotoAndPlay(this._.PC.attitude);
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