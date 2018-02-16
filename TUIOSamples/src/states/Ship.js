FastTable.Ship = function(game) {
  this.game = game;
};
FastTable.Ship.prototype = {
  init: function() {
      this.rooms =[];
      this.game.stage.disableVisibilityChange = true;
  },
	preload: function() {
        this.game.load.image('background', './src/img/splash_background.jpg');
        this.game.load.image('star_layer', './src/img/splash_parallax_layer.png');
        this.game.load.image('star_layer_2', './src/img/splash_parallax_layer_2.png');

        this.game.load.image('roomS', './src/img/piece_shield.png');
        this.game.load.image('roomE', './src/img/piece_vide_70x70.png');
        this.game.load.image('roomW', './src/img/arme.png');
        this.game.load.image('roomR', './src/img/reacteurs.png');
        this.game.load.image('falcon', './src/img/falcon.png');

        this.game.load.image('flame', './src/img/interieur_feu.png');

    },
	create: function() {
      console.log('create ship');
        this.background = this.game.add.tileSprite(0, 0, 1920, 1080, 'background');
        this.mediumLayer = this.game.add.tileSprite(0, 0, 1920, 1080, 'star_layer');
        this.frontLayer = this.game.add.tileSprite(0, 0, 1920, 1080, 'star_layer_2');


        var xIndex = 400;

        this.shipPic = this.game.add.sprite(300, 50,  'falcon');

        this.shipPic.scale.setTo(1.4);

        this.roomFlameX = xIndex;
        this.roomShield = this.game.add.sprite(xIndex, 400,  'roomS');
        xIndex+=72*3;
        this.roomEmpty = this.game.add.sprite(xIndex, 400,  'roomE');
        this.roomEmpty2 = this.game.add.sprite(xIndex, 400-(72*3),  'roomE');
        this.roomEmpty3 = this.game.add.sprite(xIndex, 400+(72*3),  'roomE');
        xIndex+=72*3;

        this.roomWeapon = this.game.add.sprite(xIndex, 400,  'roomW');
        xIndex+=72*3;

        this.roomReact = this.game.add.sprite(xIndex, 400,  'roomR');

        this.roomShield.scale.setTo(3);
        this.roomEmpty.scale.setTo(3);
        this.roomEmpty2.scale.setTo(3);
        this.roomEmpty3.scale.setTo(3);

        this.roomWeapon.scale.setTo(3);
        this.roomReact.scale.setTo(3);

        this.roomShield.inputEnabled = true;
        this.roomEmpty.inputEnabled = true;
        this.roomEmpty2.inputEnabled = true;
        this.roomEmpty3.inputEnabled = true;
        this.roomShield.inputEnabled = true;
        this.roomReact.inputEnabled = true;
        this.roomWeapon.inputEnabled = true;

        this.roomShield.events.onInputOver.add(this.roomShieldCB, this);
        this.roomEmpty.events.onInputOver.add(this.roomEmptyCB, this);
        this.roomEmpty2.events.onInputOver.add(this.roomEmpty2CB, this);
        this.roomEmpty3.events.onInputOver.add(this.roomEmpty3CB, this);
        this.roomWeapon.events.onInputOver.add(this.roomWeaponCB, this);
        this.roomReact.events.onInputOver.add(this.roomReactCB, this);

        FastTable.FastSocket.serverSocket.on('ROOM_FIRE',  (data) => {

            if(data.FIRE){
            this.fire = this.game.add.sprite(this.roomEmpty.x, this.roomEmpty.y,  'flame');
            this.fire.scale.setTo(3);
            }
        else if (this.fire!=undefined) {
            this.fire.destroy();
        }

        // /this[data.room]
        console.log(data);
    });

/*        for (var key in this.rooms) {
            if (key === 'length' || !widthRange.hasOwnProperty(key)) continue;
            var value = this.rooms[key];
            value.inputEnabled = true;
            value.events.onInputOver.add(this.key, this);

        }*/



        /*
        * TODO add flame: (and on server)
        * socket.on('FLAME',mess){
        * if(mess.show)
                 this.flameSprite = this.game.add.sprite(this.roomFlameX , 400,  'roomE');
                 else
                 //hide flames
                        this.game.state.start('ColorIOTable');

                }
        * */

    },
    roomShieldCB:function (game,pointer) {
        this.emitRoom('roomShieldCB',pointer);
    },
    roomEmptyCB:function (game,pointer) {
        this.emitRoom('roomEmptyCB',pointer);

    },roomEmpty2CB:function (game,pointer) {
        this.emitRoom('roomEmpty2CB',pointer);

    },roomEmpty3CB:function (game,pointer) {
        this.emitRoom('roomEmpty3CB',pointer);

    },roomWeaponCB:function (game,pointer) {
        this.emitRoom('roomWeaponCB',pointer);

    },roomReactCB:function (game,pointer) {
        this.emitRoom('roomReactCB',pointer);

    },
    emitRoom:function (room,pointer) {
        var tagID = this.convertPointer(pointer);
        console.log('player '+tagID+' in '+room);

        FastTable.FastSocket.serverSocket.emit('ROOM', {TAG_ID:tagID,ROOM:room});

        //data.roomString
        //data.fire=true


    }, convertPointer:function (pointer) {
        return this.conver(pointer.leftButton.isDown,pointer.rightButton.isDown,pointer.middleButton.isDown);
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
  update: function(){
      this.background.tilePosition.x += 0.1;
      this.mediumLayer.tilePosition.x += 0.3;
      this.frontLayer.tilePosition.x += 0.5;
  }
};
