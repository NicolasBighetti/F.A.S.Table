/**
 * export default function vaisseaux() {
 * $('#myTable').append('<img src="assets/vaissaux.png" width="1500">');
 * const libstack = new LibraryStack(900, 300, 300, 'salle', '#C9C9C9', false, ['ImageElementWidget']);
 * widgets.addTo('#myTable');
 * widgets.push(widget);
 * creatRoom();
 */

// Import JQuery
import $ from 'jquery/dist/jquery.min';
import RoomWidget from './ImageWidget/roomWidget';
import ImageElementWidget from './ImageWidget/ImageWidget';

let widgets = [];

function AddWidgetToScreen(widget) {
//  $('#example-container').append(widget.domElem);
  widget.addTo('#example-container');
  widgets.push(widget);
}// AddWidgetToScreen()

function RemoveWidgets() {
  $('#example-container').empty();
  for (let i = 0; i < widgets.length; i += 1) {
    widgets[i].deleteWidget();
  }
  widgets = [];
}

function buildUserTest() {
  RemoveWidgets();
  $('#example-container').append('<img src="assets/vaissaux.png" width="1500">');
  // Stack site web
  const salle = new RoomWidget(990, 200, 210, 150, 'control');
  AddWidgetToScreen(salle);
}

function buildTest() {
  RemoveWidgets();
  $('#example-container').append('<img src="assets/vaissaux.png" width="1500">');
  // Stack site web
  const salle = new ImageElementWidget(50, 50, 50, 50, './../assets/joy.png');
  AddWidgetToScreen(salle);
}

export default function buildMenu() {
  $('#example-container').append('<button id="start" class="menu-button"> start </button></br>');
  $('#example-container').append('<button id="test" class="menu-button"> test </button></br>');

  $('#start').on('click', () => {
    buildUserTest();
  });

  $('#test').on('click', () => {
    buildTest();
  });
}
