FastTable.Ship = function(game) {
  this.game = game;
    this.xspeed = 1;
    this.ennemiesKilled =0;


};
FastTable.Ship.prototype = {
  init: function() {
      this.rooms =[];
      this.game.stage.disableVisibilityChange = true;
      this.xspeed = 1;

  },
	preload: function() {
        this.game.load.image('background', './src/img/splash_background.jpg');
        this.game.load.image('star_layer', './src/img/splash_parallax_layer.png');
        this.game.load.image('star_layer_2', './src/img/splash_parallax_layer_2.png');

        this.game.load.image('elec', './src/img/elec2.png');
        this.game.load.image('tur', './src/img/turret.png');
        this.game.load.image('meteor', './src/img/meteor.png');
        this.game.load.image('shield', './src/img/TBE_Shield2.png');
        this.game.load.image('target', './src/img/target.png');



        this.game.load.image('roomS', './src/img/piece_shield.png');
        this.game.load.image('roomE', './src/img/piece_vide_70x70.png');
        this.game.load.image('roomW', './src/img/arme.png');
        this.game.load.image('roomR', './src/img/reacteurs.png');
        this.game.load.image('falcon', './src/img/falcon.png');
        this.game.load.image('healthbar', './src/img/healthsphape2.png');
        this.game.load.image('shipen', './src/img/ships_en.png');

        this.game.load.image('shotblue', './src/img/shotblue.png');
        this.game.load.image('shotred', './src/img/shotred.png');

        this.game.load.spritesheet('red_fire', './src/img/flame_sprite.png', 64, 64, 2);

        this.game.load.image('flame', './src/img/interieur_feu.png');

    },
    createLight: function(item,pointer){
      // pointer was entered
        console.log(item);
        console.log(pointer);
        item.rotation = pointer.tiltX/1000.;
        console.log(item.context);
        console.log('IN');
        this.lightID = pointer.id;
        item.game.input.addMoveCallback(function (pointer,x,y,yo,ya) {
            //console.log('move');

            if(this.lightID===pointer.id){
                item.rotation = pointer.tiltX/1000.;
            }
         /*   console.log(this);
            console.log(pointer);
            console.log(x);
            console.log(y);
            console.log(yo);
            console.log(ya);*/

        },item.context);
/*        pointer.moveCallbacks.push(function (ey,oi) {
            console.log(ey);
            console.log(oi);
        })*/
    },
/*    rotateTurret: function(pointer,two){
      console.log('update::::');
        console.log(pointer);
        console.log(two);
        pointer.game.input.addMoveCallback(this.rotateTurret,this);

    },*/
	create: function() {
        var game = this.game;
        game.physics.startSystem(Phaser.Physics.ARCADE);

        console.log('create ship');
        this.xspeed = 1;

        // background
        this.background = this.game.add.tileSprite(0, 0, 1920, 1080, 'background');
        this.mediumLayer = this.game.add.tileSprite(0, 0, 1920, 1080, 'star_layer');
        this.frontLayer = this.game.add.tileSprite(0, 0, 1920, 1080, 'star_layer_2');
        // this.asteroidLayer = this.game.add.tileSprite(0, 0, 1920, 1080);



        //ship
        this.shipPic = this.game.add.sprite(0, 0,  'falcon');
        //this.shipPic.scale.setTo(1080./700.);
        this.shipPic.width = 1388;
        this.shipPic.height = 1080;
        this.shipPic.inputEnabled = true;

        this.shipPic.enableBody = true;
        this.shipPic.physicsBodyType = Phaser.Physics.ARCADE;
        this.game.physics.enable(this.shipPic, Phaser.Physics.ARCADE);

        //this.shipPic.events.onPointerMove(this.rotateTurret,this);

        this.healthBar = this.game.add.sprite(0,0,'healthbar');
        //this.healthBar.anchor.setTo(0,0);
        this.healthBar.tint =  0x37d132;
        this.healthBar.health = 100;

        this.healthBar.scale.setTo(1388./1205.,1080./557.);
        // 1416 672
        // 1388
        this.healthBar.alpha = 0.8;
        this.healthBar.inputEnabled = true;
        this.healthBar.cropRect = new Phaser.Rectangle(0, 0, this.healthBar.width, this.healthBar.height);
        this.healthBar.crop(this.healthBar.cropRect);
        this.healthBar.oriHeight = this.healthBar.height;
        this.healthBar.events.onInputOver.add(this.changeHealth,this);
        this.healthBar.enableBody = true;
        this.healthBar.physicsBodyType = Phaser.Physics.ARCADE;
        // this.shipPic.addChild(this.healthBar);
        // 900 x 700
        // ?? x 1080

        // rooms
        var roomSize =  72*2.5;
        var scale = roomSize/72.;

        // use grid
        this.group = this.game.add.group();
        this.group.x = 220;
        this.group.y = (1080/2)-(roomSize*1.5);

        var yIndex = 0;

        //create rooms by row
        this.group.create(yIndex, yIndex++,  'roomE');
        this.group.create(yIndex, yIndex++,  'roomS');
        this.group.create(yIndex, yIndex++,  'roomE');
        this.group.create(yIndex, yIndex++,  'roomE');

        this.group.create(yIndex, yIndex++,  'roomR');
        this.group.create(yIndex, yIndex++,  'roomE');
        this.group.create(yIndex, yIndex++,  'roomE');
        this.group.create(yIndex, yIndex++,  'roomW');


        this.group.create(yIndex, yIndex++,  'roomE');
        this.group.create(yIndex, yIndex++,  'roomS');
        this.group.create(yIndex, yIndex++,  'roomE');
        this.group.create(yIndex, yIndex,  'roomE');

        // set room index & context
        var pos = 0;
        this.group.forEach(item=>item.pos=pos++);
        this.group.forEach(item=>item.context=this);

        // item size and grid layout
        this.group.scale.setTo(scale,scale);
        this.group.align(4, 3, 72, 72);

        this.group.setAll('inputEnabled', true);
        this.group.callAll('events.onInputOver.add','events.onInputOver', this.roomGenericCB,this);

        var createFlame = function(element, context){
            var fire = context.game.make.sprite(0, 0, 'red_fire');
            element.fire = fire;
            fire.animations.add('burn');
            fire.animations.play('burn', 7, true);
            element.addChild(fire);

        };
        var createLight2 = function(element, context){
            var fire = context.game.make.sprite(0, 0, 'elec');
            fire.alpha = 0.2;
            fire.tint = 0xfff719;
            element.light = fire;
            /*fire.animations.add('burn');
            fire.animations.play('burn', 7, true);*/
            element.addChild(fire);
            var tween = context.game.add.tween(fire).to( { alpha: 1 }, 2000, "Sine.easeInOut",true,0,100,true);
           // tween.yoyo(true);
            //tween.loop(true);
            tween.generateData(60);
        };
        var createShield2 = function(element, context){
            var fire = context.game.make.sprite(0, 0, 'shield');
            fire.alpha = 0.2;
            element.addChild(fire);
            element.shield = fire;
            element.shield.width = element.width;
            element.shield.height = element.height;
            var tween = context.game.add.tween(fire).to( { alpha: 1 }, 2000, "Sine.easeInOut",true,0,100,true);

            tween.generateData(60);
        };
        var createBal2 = function(element, context){
            var fire = context.game.make.sprite(0, 0, 'target');
            fire.alpha = 0.2;
            element.addChild(fire);
            element.bal = fire;
            element.bal.width = element.width;
            element.bal.height = element.height;
            var tween = context.game.add.tween(fire).to( { alpha: 1 }, 2000, "Sine.easeInOut",true,0,100,true);

            tween.generateData(60);
        };


        //turret
        this.light = this.game.add.sprite(1920/2+100,1080/2,'tur');
        this.light.anchor.x = 0.3;
        this.light.anchor.y = 0.5;
        this.light.inputEnabled = true;

        this.light.context = this;
        this.light.events.onInputOver.add(this.createLight,this);

        this.game.physics.enable(this.light, Phaser.Physics.ARCADE);

        this.light.body.drag.set(100);
        this.light.body.maxVelocity.set(0);


        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(5, 'shotblue');

        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
        this.bullets.setAll('rotation', Math.PI/2);

        this.bullets.forEach(function(item){
            item.spriteO = this.light;
        },this);
        //this.bullets.setAll('spriteO',this.light);
        this.bulletTime = 0;

        // ennemy ship
        this.groupEn = this.game.add.group();
        this.groupEn.x = 1700;
        this.groupEn.y = 0;


        this.groupEn.create(yIndex, yIndex++,  'shipen');
        this.groupEn.create(yIndex, yIndex++,  'shipen');
        this.groupEn.create(yIndex, yIndex++,  'shipen');

        this.groupEn.enableBody = true;
        this.groupEn.physicsBodyType = Phaser.Physics.ARCADE;
        //enemy shot


        //var sprite = this.light;

        //sprite.body.allowRotation = false;
        var that  = this;


        this.groupEn.forEach(function (item) {
            console.log(item);
            item.anchor.setTo(0.5,0.5);
            item.rotation = -Math.PI;
            item.scale.setTo(2,2);
            item.health = 100;
            var weapon = game.add.weapon(100, 'shotred');

            that.game.physics.arcade.enable(item);
            item.body.drag.set(70);
            item.body.maxVelocity.set(10);

          /*  weapon.bullets.forEach(function (itemm) {
               itemm.tint = 0xFF0000;
            });*/
            //  The bullet will be automatically killed when it leaves the world bounds
            weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

            //  The speed at which the bullet is fired
            weapon.bulletSpeed = 600;

            //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
            weapon.fireRate = 1000;
            weapon.trackSprite(item, 0, 0, true);
            item.weapon = weapon;
        });
        this.groupEn.align(1, 3, 150, 1080/3,Phaser.CENTER);
        // handle a fire event
        FastTable.FastSocket.serverSocket.on('FAST_GAME_FIRE', function (data){
            console.log('hey');
            var posInt = parseInt(data.pos);
            var elemen = undefined;
            console.log(that);
            //find element in group
            that.group.forEach(function (element) {
                if(element.pos==posInt)
                    elemen=element;
            });

            if (data.FIRE) {
                if(elemen.fire)
                {
                    if(!element.fire.alive)
                        element.fire.reset();
                    console.log('cannot add 2 fire');
                    return;
                }
                console.log('add fire');
                createFlame(elemen,that)
            } else {
                if(elemen.fire){
                    console.log('turning off fire');
                    elemen.fire.kill();

                }
                //elemen.children.removeAll();
            }
        });
        FastTable.FastSocket.serverSocket.on('FAST_GAME_SWITCH', function (data){
            console.log('hey switch');
            var posInt = parseInt(data.pos);
            var elemen = undefined;
            //find element in group
            that.group.forEach(function (element) {
                if(element.pos==posInt)
                    elemen=element;
            });

            if (data.FIRE) {
                if(elemen.light)
                {
                    console.log('cannot add 2 light');
                    if(!element.light.alive)
                        element.light.reset();
                    return;
                }
                console.log('add light');
                createLight2(elemen,that)
            } else {
                if(elemen.light)
                    elemen.light.kill();
                //elemen.children.removeAll();
            }
        });
        FastTable.FastSocket.serverSocket.on('FAST_GAME_METEOR', function (data){
            console.log('hey meteor');
            var posInt = parseInt(data.pos);
            var elemen = undefined;
            //find element in group
            that.group.forEach(function (element) {
                if(element.pos==posInt)
                    elemen=element;
            });

            if (data.FIRE) {
                if(elemen.shield)
                {
                    console.log('cannot add 2 light');
                    return;
                }
                console.log('add light');
                createShield2(elemen,that)
            } else {
                if(elemen.shield)
                    elemen.shield.kill();
                //elemen.children.removeAll();
            }
        });
        FastTable.FastSocket.serverSocket.on('FAST_GAME_BALLISTIC', function (data){
            console.log('hey meteor');
            var posInt = parseInt(data.pos);
            var elemen = undefined;
            //find element in group
            that.group.forEach(function (element) {
                if(element.pos==posInt)
                    elemen=element;
            });

            if (data.FIRE) {
                if(elemen.bal)
                {
                    console.log('cannot add 2 light');
                    return;
                }
                console.log('add light');
                createBal2(elemen,that)
            } else {
                if(elemen.bal)
                    elemen.bal.kill();
                //elemen.children.removeAll();
            }
        });
    },
     fireBullet:function () {
        console.log('fire');
        if (this.game.time.now > this.bulletTime)
        {

            var bullet = this.bullets.getFirstExists(false);

            if (bullet)
            {

                // not good coordinate
                bullet.reset(bullet.spriteO.body.x + bullet.spriteO.body.halfWidth, bullet.spriteO.body.y + + bullet.spriteO.body.halfHeight);
                bullet.lifespan = 2000;
                bullet.rotation = bullet.spriteO.rotation;
                this.game.physics.arcade.velocityFromRotation(bullet.spriteO.rotation, 400,bullet.body.velocity);
                this.bulletTime = this.game.time.now + 50;
            }


        }
         this.groupEn.forEach(function (item) {
             if(item.weapon)
            item.weapon.fire();
         });

},
    changeHealth:function(item,context){
      console.log(item.health);
      if(item.health>8)
        item.health-=1;
      else
          item.health+=80;

      item.tint = Phaser.Color.interpolateColor(0xFF0000,0x00FF00, 100, item.health);

        item.cropRect.x = ((100-item.health)/100.)*item.oriHeight;
        item.x = item.cropRect.x;

        //console.dir(item.cropRect);
      item.crop(this.healthBar.cropRect);

    },
    changeHealth2:function(value){
        this.healthBar.health = value;
        var item = this.healthBar;
        item.tint = Phaser.Color.interpolateColor(0xFF0000,0x00FF00, 100, value);

        item.cropRect.x = ((100-value)/100.)*item.oriHeight;
        item.x = item.cropRect.x;

        //console.dir(item.cropRect);
        item.crop(this.healthBar.cropRect);

    },
    roomGenericCB:function (item,pointer) {
        item.context.increaseXspeed();
        item.context.emitRoom(item.pos,pointer);
    },
    increaseXspeed:function(){
      if(this.xspeed===undefined)
          this.xspeed=1;
      this.xspeed+=1;
    },
    emitRoom:function (room,pointer) {
        //var tagID = this.convertPointer(pointer);
        console.log('player '+pointer.id+' in '+room);

        FastTable.FastSocket.serverSocket.emit('ROOM', {TAG_ID:pointer.id,ROOM:room});

    },
  update: function(){
      this.background.tilePosition.x -= (0.1*this.xspeed);
      this.mediumLayer.tilePosition.x -= (0.3*this.xspeed);
      this.frontLayer.tilePosition.x -= (0.5*this.xspeed);
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
      {
          this.fireBullet();
      }


      //ennemy to friend
        if(this.groupEn){
            // friend to ennemy
            var that = this;

            this.game.physics.arcade.overlap(this.bullets, this.groupEn, this.hitEnemy, null, this);
            this.groupEn.forEach(function (item) {
                if(item.weapon){
                    // console.log('collide'+ that.healthBar.health);
                    that.game.physics.arcade.overlap(item.weapon.bullets, that.shipPic, that.hitFriend, null, that);
                    that.game.physics.arcade.overlap(that.healthBar,item.weapon.bullets, that.hitFriend, null, that);

                }

            });
        }

  },
    hitEnemy:function (bullet,sprite) {

        bullet.kill();
        if(sprite.health){
            sprite.health-=10;
            if(sprite.health<0){
                sprite.weapon=undefined;
                sprite.kill();
                this.ennemiesKilled +=1;
            }
        }
        else{
            if(sprite.weapon)
                sprite.weapon=undefined;
            sprite.kill();
        }

    },
    hitFriend:function (sprite,bullet) {
        console.log('hitfr');
        console.log(bullet);

        console.log(sprite);
        bullet.kill();
        this.changeHealth2(this.healthBar.health-2);
        console.log(this.healthBar.health);

    }
};
