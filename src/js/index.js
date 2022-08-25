mdc.ripple.MDCRipple.attachTo(document.getElementById('button-center-item'));
const button = document.getElementById('button-center-item');
let continueIDOK = false;
let continueVOK = false;
let continueLOK = false;
let continueWOK = false;

// FOR INPUT FORM
const textField = document.querySelector('.mdc-text-field__input');

// define what happens on input
const handleInput = (event) => {
  event.preventDefault();
  // to get most recent value, get element fresh
  // count number of characters and display the count
  document.querySelector('.mdc-text-field-character-counter').innerHTML = `${
    document.querySelector('.mdc-text-field__input').value.length
  } / 10`;

  // FOR DEMO, ALLOW ANY LENGTH OF ID
  continueIDOK =
    document.querySelector('.mdc-text-field__input').value.length > 0;

  // enable button when at least one character is entered
  button.disabled = !(
    continueIDOK &&
    continueVOK &&
    continueLOK &&
    continueWOK
  );
};

textField.addEventListener('keyup', handleInput, { capture: false });

// FOR STUDY VERSION
// get both radio buttons
const radiosV = document.getElementsByName('radios-v');
let studyversion = null;

// when users click on a button...
for (radio in radiosV) {
  radiosV[radio].onclick = function () {
    // if first 'yes' button is selected, save consent as true
    if (this.getAttribute('id') == 'radio-box') {
      studyversion = 'box';

      // if second 'no' button is selected, save consent as false
    } else if (this.getAttribute('id') == 'radio-hedge') {
      studyversion = 'hedge';

      // should never reach here, just for security
    } else {
      studyversion = 'hedge';
    }

    continueVOK = true;

    // enable submit button
    button.disabled = !(
      continueIDOK &&
      continueVOK &&
      continueLOK &&
      continueWOK
    );
  };
}

// FOR LANGUAGE
// get both radio buttons
const radiosLang = document.getElementsByName('radios-lang');
let lang = null;

// when users click on a button...
for (radio in radiosLang) {
  radiosLang[radio].onclick = function () {
    // if first 'yes' button is selected, save consent as true
    if (this.getAttribute('id') == 'radio-en') {
      lang = 'en';

      // if second 'no' button is selected, save consent as false
    } else if (this.getAttribute('id') == 'radio-de') {
      lang = 'de';

      // should never reach here, just for security
    } else {
      lang = 'en';
    }

    continueLOK = true;

    // enable submit button
    button.disabled = !(
      continueIDOK &&
      continueVOK &&
      continueLOK &&
      continueWOK
    );
  };
}

// FOR WEBCAM RECORIDING
// get both radio buttons
const radiosWebcam = document.getElementsByName('radios-webcam');
let webcam = false;

// when users click on a button...
for (radio in radiosWebcam) {
  radiosWebcam[radio].onclick = function () {
    // if first 'yes' button is selected, save consent as true
    if (this.getAttribute('id') === 'radio-webcam-yes') {
      webcam = true;
    }

    if (this.getAttribute('id') === 'radio-webcam-no') {
      webcam = false;
    }

    continueWOK = true;

    // enable submit button
    button.disabled = !(
      continueIDOK &&
      continueVOK &&
      continueLOK &&
      continueWOK
    );
  };
}

// FOR CONTINUE BUTTON
// define what happens on button click
const handleContinueClick = (event) => {
  event.preventDefault();
  const subjID = document.querySelector('.mdc-text-field__input').value;

  // inhouse variable hardcoded to true for kiga version
  window.location.href = `https://ccp-odc.eva.mpg.de/tango-demo/experiment.html?ID=${subjID}&v=${studyversion}&lang=${lang}&webcam=${webcam}`;
};

button.addEventListener('click', handleContinueClick);
