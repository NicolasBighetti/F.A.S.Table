var FastTable = {
	_WIDTH: 480,
	_HEIGHT: 320
};
FastTable.DemoState = function(game) {
  this.game = game;
};
FastTable.DemoState.prototype = {
	preload: function() {
    this.game.load.image('background', './src/img/splash_background.jpg');
    this.game.load.image('star_layer', './src/img/splash_parallax_layer.png');
    this.game.load.image('star_layer_2', './src/img/splash_parallax_layer_2.png');
  },
	create: function() {
		/*this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.game.state.start('SplashScreen', true, false, MINIGAMELIST.FAST_GAME_SWITCH);*/
    this.background = this.game.add.tileSprite(0, 0, 1920, 1080, 'background');
    this.mediumLayer = this.game.add.tileSprite(0, 0, 1920, 1080, 'star_layer');
    this.frontLayer = this.game.add.tileSprite(0, 0, 1920, 1080, 'star_layer_2');
	},
  update: function(){
    this.background.tilePosition.x += 0.1;
    this.mediumLayer.tilePosition.x += 0.3;
    this.frontLayer.tilePosition.x += 0.5;
  }
};
