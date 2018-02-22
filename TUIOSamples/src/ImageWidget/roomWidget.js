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
  createDown(id,x,y){
      var event = new PointerEvent('pointerdown', {
          view: window,
          bubbles: true,
          cancelable: true,
          pointerId:id,
          clientX: x,
          clientY: y
      });
      var yz = document.getElementsByTagName("canvas")[0];
      yz.dispatchEvent(event);
  }
  createmove(id,x,y,ang,tuioTag2){
      var event = new PointerEvent('pointermove', {
          view: window,
          bubbles: true,
          cancelable: true,
          pointerId:id,
          clientX: x,
          clientY: y,
          angle:ang,
          tiltX:ang*1000,
          tiltY:ang,
          tuioTag:tuioTag2,
          aaaa:'aa'
      });
      var yz = document.getElementsByTagName("canvas")[0];
      yz.dispatchEvent(event);
  }
  createUp(id){
      var event = new PointerEvent('pointerup', {
          view: window,
          bubbles: true,
          cancelable: true,
          pointerId:id
      });

      var yz = document.getElementsByTagName("canvas")[0];
      yz.dispatchEvent(event);
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
    this.createDown(index,tuioTag.x,tuioTag.y);
  }
    onTagUpdate(tuioTag) {
        // console.log('up'+tuioTag.id);
        var index = this.atoms[tuioTag.id];
       /* var event = new MouseEvent('mousemove', {
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
        y.dispatchEvent(event);*/
       //console.dir(tuioTag);
       var ang = tuioTag._angle;
       //console.log(ang);
        this.createmove(index,tuioTag.x,tuioTag.y,ang,tuioTag);
    }
  onTagDeletion(tuioTagId){
      var inverI = this.atoms[tuioTagId];
      this.atomsOS[inverI] = -1;
      this.atoms[tuioTagId] = -1;
      this.atomsNB-=1;
      console.log('deletion' + tuioTagId);
      this.createUp(tuioTagId);

      super.onTagDeletion(tuioTagId);
      // this._domElem.css('background-color', 'yellow');
  }
    onTouchCreation(tuioTouch){
        var event = new PointerEvent('pointerdown', {
            view: window,
            bubbles: true,
            cancelable: true,
            pointerId:tuioTouch.id,
            clientX: tuioTouch.x,
            clientY: tuioTouch.y

        });
        console.log('touch: '+tuioTouch.x + ' ' +tuioTouch.y);
        console.dir(event);
        // event.isTrusted = true;
        // console.log(event.identifier)
        var y = document.getElementsByTagName("canvas")[0];
        y.dispatchEvent(event);

    }

      onTouchUpdate(tuioTouch) {
          //super.onTouchUpdate(tuioTouch);
        console.log('update'+tuioTouch);


      /*    var event = new PointerEvent('pointermove', {
              view: window,
              bubbles: true,
              cancelable: true,
              pointerId:tuioTouch.id,
              clientX: tuioTouch.x,
              clientY: tuioTouch.y
          });
          console.log('touch: '+tuioTouch.x + ' ' +tuioTouch.y);
          console.dir(event);
          // event.isTrusted = true;
          // console.log(event.identifier)
          var y = document.getElementsByTagName("canvas")[0];
          //console.log(y);
          y.dispatchEvent(event);*/
      }
    onTouchDeletion(tuioTouch) {

        console.log(tuioTouch);

        var event = new PointerEvent('pointerup', {
            view: window,
            bubbles: true,
            cancelable: true,
            pointerId:tuioTouch
        });
        console.dir(event);
        // event.isTrusted = true;
        // console.log(event.identifier)
        var y = document.getElementsByTagName("canvas")[0];
        //console.log(y);
        y.dispatchEvent(event);
    }

}

export default RoomWidget;
