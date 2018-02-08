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
/*    this._domElem = $('<img>');
//    this._domElem.attr('src', imgSrc);
    this._domElem.css('background-color', 'yellow');
    this._domElem.css('width', `${width}px`);
    this._domElem.css('height', `${height}px`);
    this._domElem.css('position', 'absolute');
    this._domElem.css('left', `${x}px`);
    this._domElem.css('top', `${y}px`);*/
  }

  onTagCreation(tuioTag) {
    super.onTagCreation(tuioTag);
    console.log('creation', + JSON.stringify(tuioTag));
    if (this.isTouched(tuioTag.x, tuioTag.y)){
      this._domElem.css('background-color', players_color[tuioTag.id]);
    }
  }

  onTagDeletion(tuioTagId){
      console.log('deletion', + JSON.stringify(tuioTag));

      super.onTagDeletion(tuioTagId);
    this._domElem.css('background-color', 'yellow');
  }
}

export default RoomWidget;
