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
    this.atomsNB = 0;
    console.log('ROOM WIDGET CREATED');

  }

  onTagCreation(tuioTag) {
    super.onTagCreation(tuioTag);
      this.atoms[tuioTag.id] = this.atomsNB;
      this.atomsNB+=1;
    console.log('creation', + tuioTag.x +' '+ tuioTag.y+' '+tuioTag.id);
    console.dir(tuioTag);
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
      this.atoms[tuioTagId] = -1;
      this.atomsNB-=1;
      console.log('deletion', + JSON.stringify(tuioTagId));

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
          'button':0,
          'buttons':0
      });
      console.log(tuioTouch.x + '' +tuioTouch.y);
      console.log(event);
      //event.isTrusted = true;
      //console.log(event.identifier)
      var y = document.getElementsByTagName("canvas")[0];
      //console.log(y);
      y.dispatchEvent(event);
  }

  onTagUpdate(tuioTag) {
      //console.log('up'+tuioTag.id);
      var event = new MouseEvent('mousemove', {
          'view': window,
          'bubbles': true,
          'cancelable': true,
          'clientX': tuioTag.x,
          'clientY': tuioTag.y,
          'buttons': this.atoms[tuioTag.id],
          'button': this.atoms[tuioTag.id],
          'id': tuioTag.id,
          'identifier':tuioTag.id,
          'sender':tuioTag.id,
          'region':tuioTag.id

      });
        event.identifier = tuioTag.id;
        //console.log(event.identifier)
      var y = document.getElementsByTagName("canvas")[0];
      //console.log(y);
      y.dispatchEvent(event);
  }
}

export default RoomWidget;
