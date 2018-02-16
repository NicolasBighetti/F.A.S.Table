import $ from 'jquery/dist/jquery.min';

import TUIOWidget from 'tuiomanager/core/TUIOWidget';

const players_color = ['blue','red'];

class RoomWidget extends TUIOWidget {

  constructor(x, y, width, height, roomType,gamep) {
    super(x, y, width, height);
    this.game = gamep;
    this._lastTouchesValues = {};
    this._lastTagsValues = {};
    this.eventsList = [];
    this.dors = [];
    this.atoms = [];
      this.atomsOS = [];
      for(var i = 0;i<4;i++){
          this.atomsOS[i]=-1;
      }
    this.atomsNB = 0;
    console.log('ROOM WIDGET CREATED');

  }
  findFirstEmptyTagIndex(){
      for(var i = 0;i<4;i++){
          if(this.atomsOS[i]===-1){
              return i;
          }
      }
      return -1;
  }
  onTagCreation(tuioTag) {
    super.onTagCreation(tuioTag);
    var index = this.findFirstEmptyTagIndex();
    console.log('index free:'+index);
    this.atomsOS[index] = tuioTag.id;
      this.atoms[tuioTag.id] = index;
      this.atomsNB+=1;
    console.log('creation', + tuioTag.x +' '+ tuioTag.y+' '+tuioTag.id);
    console.dir(tuioTag);
    console.dir(this.atomsOS);
    console.dir(this.atoms);
   /* this.game.input.addPointer();
    console.log('oi');*/
  /*  var event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'clientX': tuioTag.x,
        'clientY': tuioTag.y
    });
      document.body.dispatchEvent(event);*/

    if (this.isTouched(tuioTag.x, tuioTag.y)){
      // this._domElem.css('background-color', players_color[tuioTag.id]);
    }
  }

  onTagDeletion(tuioTagId){
      var inverI = this.atoms[tuioTagId];
      this.atomsOS[inverI] = -1;
      this.atoms[tuioTagId] = -1;
      this.atomsNB-=1;
      console.log('deletion' + tuioTagId);

      super.onTagDeletion(tuioTagId);
      // this._domElem.css('background-color', 'yellow');
  }

  onTouchUpdate(tuioTouch) {

      var event = new MouseEvent('mousemove', {
          'view': window,
          'bubbles': true,
          'cancelable': true,
          'clientX': tuioTouch.x,
          'clientY': tuioTouch.y,
          'button':4,
          'buttons':4
      });
      console.log('touch: '+tuioTouch.x + ' ' +tuioTouch.y);
      console.dir(event);
      // event.isTrusted = true;
      // console.log(event.identifier)
      var y = document.getElementsByTagName("canvas")[0];
      //console.log(y);
      y.dispatchEvent(event);
  }

  onTagUpdate(tuioTag) {
      // console.log('up'+tuioTag.id);
      var index = this.atoms[tuioTag.id];
      var event = new MouseEvent('mousemove', {
          'view': window,
          'bubbles': true,
          'cancelable': true,
          'clientX': tuioTag.x,
          'clientY': tuioTag.y,
          'buttons': index,
          'button': index

      });
        //console.log(event.identifier)
      var y = document.getElementsByTagName("canvas")[0];
      //console.log(y);
      y.dispatchEvent(event);
  }
}

export default RoomWidget;
