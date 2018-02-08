import $ from 'jquery/dist/jquery.min';

import TUIOWidget from 'tuiomanager/core/TUIOWidget';

const players_color = ['blue','red'];

class RoomWidget extends TUIOWidget {
  constructor(x, y, width, height, roomType) {
    super(x, y, width, height);

    this._lastTouchesValues = {};
    this._lastTagsValues = {};
    this.eventsList = [];
    this.dors = [];
    console.log('ROOM WIDGET CREATED');

  }

  onTagCreation(tuioTag) {
    super.onTagCreation(tuioTag);
    console.log('creation', + tuioTag.x +' '+ tuioTag.y+' '+tuioTag.id);
    console.dir(tuioTag);
    if (this.isTouched(tuioTag.x, tuioTag.y)){
      // this._domElem.css('background-color', players_color[tuioTag.id]);
    }
  }

  onTagDeletion(tuioTagId){
      console.log('deletion', + JSON.stringify(tuioTagId));

      super.onTagDeletion(tuioTagId);
      // this._domElem.css('background-color', 'yellow');
  }

  onTouchUpdate(tuioTouch) {
      console.log('touch'+tuioTouch.x+' '+tuioTouch.y+' id'+tuioTouch.id);

  }

  onTagUpdate(tuioTag) {
    console.log('update');
    console.log('update' + tuioTag.x +' '+ tuioTag.y+' '+tuioTag.id );

  }
}

export default RoomWidget;
