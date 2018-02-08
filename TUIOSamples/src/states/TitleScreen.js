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
    if (this.game.device.android && this.game.device.chrome && this.game.device.chromeVersion >= 55) {
    this.game.sound.setTouchLock();
    this.game.input.touch.addTouchLockCallback(function () {
        if (this.noAudio || !this.touchLocked || this._unlockSource !== null) {
            return true;
        }
        if (this.usingWebAudio) {
            // Create empty buffer and play it
            // The SoundManager.update loop captures the state of it and then resets touchLocked to false

            var buffer = this.context.createBuffer(1, 1, 22050);
            this._unlockSource = this.context.createBufferSource();
            this._unlockSource.buffer = buffer;
            this._unlockSource.connect(this.context.destination);

            if (this._unlockSource.start === undefined) {
                this._unlockSource.noteOn(0);
            }
            else {
                this._unlockSource.start(0);
            }

            //Hello Chrome 55!
            if (this._unlockSource.context.state === 'suspended') {
                this._unlockSource.context.resume();
            }
        }

        //  We can remove the event because we've done what we needed (started the unlock sound playing)
        return true;

    }, this.game.sound, true);
}
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
