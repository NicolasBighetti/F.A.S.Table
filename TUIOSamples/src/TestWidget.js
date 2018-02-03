import TUIOWidget from 'tuiomanager/core/TUIOWidget';



const players_color = ['blue','red'];



class TestWidget extends TUIOWidget {

  this.atomInputAssociation = [];

  this.currentInput = 0;

  constructor() {


  }

  onTagCreation(tuioTag) {
    console.log('tag created : ' + tuioTag)
  }

  onTagDeletion(tuioTagId){
    console.log('tag deleted : ' + tuioTagId)
  }

}

export default TestWidget;
