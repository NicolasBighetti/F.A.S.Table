
function FastSound(game){

  this.game = game;

  this.currentMusic = undefined;

  this.assets = [];

  this.loadSound = function(filePath, id, isMusic){
    this.game.load.audio(id,filePath);
    this.assets[id] = this.game.add.audio(id, 1, isMusic);
    if(isMusic){
      this.playMusic = function(ident){
        this.game.sound.setDecodedCallback(this.assets[ident], function(){
          if(this.assets[ident]){
            if(this.currentMusic){
              this.currentMusic.stop();
            }
            this.currentMusic = this.assets[ident];
            this.currentMusic.play();
          }
        }, this);
      };
    }
  };

  this.playSound = function(id){
    if(this.assets[id]){
      this.assets[id].play();
    }
  };
}
