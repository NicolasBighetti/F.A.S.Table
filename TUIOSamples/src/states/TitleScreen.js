var FastTable = {
	_WIDTH: 1920,
	_HEIGHT: 1080
};
FastTable.TitleScreen = function(game) {
  this.game = game;
  this._roomHeight = 250;
  this._roomWidth = 250;
  this.fastSound = new FastSound(game);
};
FastTable.TitleScreen.prototype = {
  init: function() {

  },
	preload: function() {
    this.game.load.image('background', './src/img/splash_background.jpg');
    this.game.load.image('star_layer', './src/img/splash_parallax_layer.png');
    this.game.load.image('star_layer_2', './src/img/splash_parallax_layer_2.png');

    this.fastSound.loadSound('src/sound/music/title.mp3', 'title', true);

		//this.game.load.image('room', './src/img/room.png');
  },
	create: function() {
    this.background = this.game.add.tileSprite(0, 0, 1920, 1080, 'background');
    this.mediumLayer = this.game.add.tileSprite(0, 0, 1920, 1080, 'star_layer');
    this.frontLayer = this.game.add.tileSprite(0, 0, 1920, 1080, 'star_layer_2');
    this.fastSound.playMusic('title');
	},
  update: function(){
    this.background.tilePosition.x += 0.1;
    this.mediumLayer.tilePosition.x += 0.3;
    this.frontLayer.tilePosition.x += 0.5;
  }
};
