/**
 * @author Christian Brel <ch.brel@gmail.com>
 * @author Vincent Forquet
 * @author Nicolas Forget
 */

// Import JQuery
import $ from 'jquery/dist/jquery.min';

// Import TUIOManager
import TUIOManager from 'tuiomanager/core/TUIOManager';


/** TUIOManager starter **/
const tuioManager = new TUIOManager();
tuioManager.start();

/** App Code **/

const buildApp = () => {
  $('#app').append('<div id="example-container"> </div>');

  };

$(window).ready(() => {
  buildApp();
});
