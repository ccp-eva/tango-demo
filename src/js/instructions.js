const button = document.getElementById('button-center-item');

// get and store id
const subjID = new URL(document.location.href).searchParams.get('ID');
const inhouse = new URL(document.location.href).searchParams.get('inhouse');

// define what happens on button click
const handleContinueClick = (event) => {
  event.preventDefault();
  window.location.href = `https://ccp-odc.eva.mpg.de/tango-demo/webcam.html?inhouse=${inhouse}&ID=${subjID}`;
};

button.addEventListener('click', handleContinueClick, { capture: false });
