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

    this.game.load.image('logo', './src/img/logo.png');
    this.game.load.image('startUp', './src/img/press_start_up.png');
    this.game.load.image('startDown', './src/img/press_start_down.png');


    this.fastSound.loadSound('src/sound/music/title.mp3', 'title', true);

    this.game.load.image('room', 'src/img/room.png');
  },
	create: function() {
    this.background = this.game.add.tileSprite(0, 0, 1920, 1080, 'background');
    this.mediumLayer = this.game.add.tileSprite(0, 0, 1920, 1080, 'star_layer');
    this.frontLayer = this.game.add.tileSprite(0, 0, 1920, 1080, 'star_layer_2');

    this.logo = this.game.add.sprite(560, 320, 'logo');
    this.startUp = this.game.add.sprite(616,250,'startUp');
    this.startDown = this.game.add.sprite(616,740,'startDown');
    this.fastSound.playMusic('title');
    this.game.input.onTap.add(this.goToNextState, this);
    this.game.time.events.loop(Phaser.Timer.HALF, this.blinkSprite, this);

/*    this.room = this.frontLayer;
    this.room = this.game.add.tileSprite(0, 0, 1920, 1080, 'room1');
    this.room.inputEnabled = true;
        this.room.alpha = 0.5;
        this.room.anchor.set(0.5);
        this.game.input.addMoveCallback(this.p, this);*/

        //this.game.events.onInputDown.add(this.p, this);*/

    },
    conver:function(left,right,middle){
      if(!left&&!right&&!middle){
          return 0;
      }
        if(left&&!right&&!middle){
            return 1;
        }
        if(!left&&right&&!middle){
            return 2;
        }

        if(left&&right&&!middle){
            return 3;
        }
        return -1;
    },
    p:function (pointer) {

         console.log(pointer);
         console.log(pointer.leftButton.isDown);

         console.log(pointer.rightButton.isDown);
         console.log(pointer.middleButton.isDown);
        var id = this.conver(pointer.leftButton.isDown,pointer.rightButton.isDown,pointer.middleButton.isDown);
        console.log(id);



        // console.log(pointer);

    },
/*=======
		this.logo = this.game.add.sprite(560, 320, 'logo');
		this.startUp = this.game.add.sprite(616,250,'startUp');
		this.startDown = this.game.add.sprite(616,740,'startDown');
    this.fastSound.playMusic('title');
		this.game.input.onTap.add(this.goToNextState, this);
		this.game.time.events.loop(Phaser.Timer.HALF, this.blinkSprite, this);
	},*/
	blinkSprite: function(){
		this.startUp.visible = !this.startUp.visible;
		this.startDown.visible = !this.startDown.visible;
	},
/*>>>>>>> e6744151ee900c7ddeffd4db3274341cd52bba8a*/
  update: function(){
    this.background.tilePosition.x += 0.1;
    this.mediumLayer.tilePosition.x += 0.3;
    this.frontLayer.tilePosition.x += 0.5;
/*<<<<<<< HEAD
      if (this.room.input.pointerOver())
      {
          this.room.alpha = 1;
      }
      else
      {
          this.room.alpha = 0.5;
      }
  }
=======*/
  },
	goToNextState: function(){
		this.game.state.start('ColorIOTable');
	}
/*
>>>>>>> e6744151ee900c7ddeffd4db3274341cd52bba8a*/
};
