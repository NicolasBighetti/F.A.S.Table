FastTable.ColorIOTable = function(game) {
  this.game = game;
};
FastTable.ColorIOTable.prototype = {
    init: function() {
        this.redOK=-1;
        this.greenOK=-1;
        this.blueOK=-1;
        this.whiteOK=-1;
        this.sent=false; // 192.168.1.25
        FastTable.FastSocket = new FASockeT('192.168.1.25');
        // FastTable.FastSocket = new FASockeT('10.212.115.16');

        FastTable.FastSocket.init();
        this.game.stage.disableVisibilityChange = true;
    },
    preload: function() {
        this.game.load.image('red', './src/img/red.png');
        this.game.load.image('green', './src/img/green.png');
        this.game.load.image('blue', './src/img/blue.png');
        this.game.load.image('white', './src/img/white.png');

        this.game.load.image('background', './src/img/splash_background.jpg');
        this.game.load.image('star_layer', './src/img/splash_parallax_layer.png');
        this.game.load.image('star_layer_2', './src/img/splash_parallax_layer_2.png');
        this.game.load.image('croix', './src/img/croix.png');



    },
    create: function() {
        this.background = this.game.add.tileSprite(0, 0, 1920, 1080, 'background');
        this.mediumLayer = this.game.add.tileSprite(0, 0, 1920, 1080, 'star_layer');
        this.frontLayer = this.game.add.tileSprite(0, 0, 1920, 1080, 'star_layer_2');

        this.frontLayer.inputEnabled = true;
        this.frontLayer.events.onInputOver.add(this.cross, this);

        this.redPane = this.game.add.sprite(200,200,'red');
        this.greenPane = this.game.add.sprite(1200,200,'green');
        this.bluePane = this.game.add.sprite(1200,600,'blue');
        this.whitePane = this.game.add.sprite(200,600,'white');

        this.crossOv = this.game.add.sprite(-100,-100,'croix');


        this.redPane.scale.setTo(0.5,0.5);
        this.greenPane.scale.setTo(0.5,0.5);
        this.bluePane.scale.setTo(0.5,0.5);
        this.whitePane.scale.setTo(0.5,0.5);

        this.redPane.inputEnabled = true;
        this.redPane.events.onInputOver.add(this.redover, this);
        this.redPane.events.onInputOut.add(this.redover2, this);

        this.bluePane.inputEnabled = true;
        this.bluePane.events.onInputOver.add(this.bluePaneover, this);
        this.bluePane.events.onInputOut.add(this.bluePaneover2, this);

        this.greenPane.inputEnabled = true;
        this.greenPane.events.onInputOver.add(this.greenPaneover, this);
        this.greenPane.events.onInputOut.add(this.greenPaneover2, this);


        this.whitePane.inputEnabled = true;
        this.whitePane.events.onInputOver.add(this.whitePaneover, this);
        this.whitePane.events.onInputOut.add(this.whitePaneover2, this);

        // this.game.input.addMoveCallback(this.p, this);

        this.redPane.alpha = 0.5;
        this.greenPane.alpha = 0.5;
        this.bluePane.alpha = 0.5;
        this.whitePane.alpha = 0.5;


    },
    redover:function (game,pointer) {
        var tagID = this.convertPointer(pointer);
        this.redPane.alpha = 1;
        this.redOK=tagID;
        console.log('red'+tagID);
        this.checkSend();

    },
    greenPaneover:function (game,pointer) {
        var tagID = this.convertPointer(pointer);
        this.greenOK=tagID;
        this.greenPane.alpha = 1;

        console.log('green'+tagID);
        this.checkSend();

    },bluePaneover:function (game,pointer) {

        var tagID = this.convertPointer(pointer);
        this.blueOK=tagID;
        this.bluePane.alpha = 1;

        console.log('blue'+tagID);
        this.checkSend();

    },whitePaneover:function (game,pointer) {
        var tagID = this.convertPointer(pointer);
        this.whiteOK=tagID;

        this.whitePane.alpha = 1;

        console.log('white'+tagID);
        this.checkSend();

    },
    bluePaneover2:function (game,pointer) {
          var tagID = this.convertPointer(pointer);
          if(tagID==this.blueOK){
              this.bluePane.alpha = 0.5;
              console.log('blue remove'+tagID);
          }
          console.log('not same');

    },
    greenPaneover2:function (game,pointer) {
        var tagID = this.convertPointer(pointer);
        //this.greenPane.alpha = 0.5;

        if(tagID==this.greenOK){
            this.greenPane.alpha = 0.5;
            console.log('greenPane remove'+tagID);
        }
    },
    whitePaneover2:function (game,pointer) {
        var tagID = this.convertPointer(pointer);
        if(tagID==this.whiteOK){
            this.whitePane.alpha = 0.5;
            console.log('whitePane remove'+tagID);
        }
    },
    redover2:function (game,pointer) {
        var tagID = this.convertPointer(pointer);
        if(tagID==this.redOK){
            this.redPane.alpha = 0.5;
            console.log('redPane remove'+tagID);
        }
    },

    checkSend:function () {
        if(this.redOK===-1||this.blueOK===-1||this.greenOK===-1||this.whiteOK===-1){
            return;
        }

        var jsonObject1 = {
            ATOM_PLAYER_ID: this.redOK,
            ATOM_PHONE_ID: 1
        };
        var jsonObject2 = {
            ATOM_PLAYER_ID: this.blueOK,
            ATOM_PHONE_ID: 4
        };
        var jsonObject3 = {
            ATOM_PLAYER_ID: this.greenOK,
            ATOM_PHONE_ID: 2
        };
        var jsonObject4 = {
            ATOM_PLAYER_ID: this.whiteOK,
            ATOM_PHONE_ID: 7
        };
        console.log('sending start to serv');
        if(this.sent){
            console.log('connect already sent');
            return;
        }
        this.sent = true;
        FastTable.FastSocket.serverSocket.emit('FAST_PHONE_CONNECT', jsonObject1);
        FastTable.FastSocket.serverSocket.emit('FAST_PHONE_CONNECT', jsonObject2);
        FastTable.FastSocket.serverSocket.emit('FAST_PHONE_CONNECT', jsonObject3);
        FastTable.FastSocket.serverSocket.emit('FAST_PHONE_CONNECT', jsonObject4);
        FastTable.FastSocket.serverSocket.on('FAST_PHONE_OK',  (data) => {
            this.game.state.start('Ship');

            console.log(data);
        });




    },

    convertPointer:function (pointer) {
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

  },
  cross:function(game,pointer){
      var tagID = this.convertPointer(pointer);
        if(tagID===0)
            this.game.physics.arcade.moveToXY(this.crossOv,pointer.x,pointer.y,1000,1000);
  }
};
