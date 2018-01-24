import $ from 'jquery/dist/jquery.min';

import TUIOWidget from 'tuiomanager/core/TUIOWidget';

class RoomWidget extends TUIOWidget {
  constructor(x, y, width, height, roomType) {
    super(x, y, width, height);

    this._lastTouchesValues = {};
    this._lastTagsValues = {};
    this._eventsList = [];
    this.dors = [];

    this._domElem = $('<img>');
//    this._domElem.attr('src', imgSrc);
    this._domElem.css('background-color', '#2196f3');
    this._domElem.css('width', `${width}px`);
    this._domElem.css('height', `${height}px`);
    this._domElem.css('position', 'absolute');
    this._domElem.css('left', `${x}px`);
    this._domElem.css('top', `${y}px`);
  }
}

export default RoomWidget;
