// import animation library
import { gsap } from 'gsap';
import * as mrec from '@ccp-eva/media-recorder';
import * as DetectRTC from 'detectrtc';

import welcomeSrcDe from 'url:../sounds/de/welcome.mp3';
import goodbyeSrcDe from 'url:../sounds/de/goodbye.mp3';
import promptGeneralSrcDe from 'url:../sounds/de/prompt-general.mp3';
import promptHedgeSrcDe from 'url:../sounds/de/prompt-hedge.mp3';
import promptBoxSrcDe from 'url:../sounds/de/prompt-box.mp3';
import promptTouchSrcDe from 'url:../sounds/de/prompt-touch.mp3';
import promptTouchLongSrcDe from 'url:../sounds/de/prompt-touch-long.mp3';
import testHedge3SrcDe from 'url:../sounds/de/test-hedge-3.mp3';
import testBox3SrcDe from 'url:../sounds/de/test-box-3.mp3';

import welcomeSrcEn from 'url:../sounds/en/welcome.mp3';
import goodbyeSrcEn from 'url:../sounds/en/goodbye.mp3';
import promptGeneralSrcEn from 'url:../sounds/en/prompt-general.mp3';
import promptHedgeSrcEn from 'url:../sounds/en/prompt-hedge.mp3';
import promptBoxSrcEn from 'url:../sounds/en/prompt-box.mp3';
import promptTouchSrcEn from 'url:../sounds/en/prompt-touch.mp3';
import promptTouchLongSrcEn from 'url:../sounds/en/prompt-touch-long.mp3';
import testHedge3SrcEn from 'url:../sounds/en/test-hedge-3.mp3';
import testBox3SrcEn from 'url:../sounds/en/test-box-3.mp3';

// these, we need in our animation function. here, we'll calculate duration
import touch1SrcDe from 'url:../sounds/de/touch-1.mp3';
import famHedge1SrcDe from 'url:../sounds/de/fam-hedge-1.mp3';
import testHedge1SrcDe from 'url:../sounds/de/test-hedge-1.mp3';
import testHedge2SrcDe from 'url:../sounds/de/test-hedge-2.mp3';
import famBox1SrcDe from 'url:../sounds/de/fam-box-1.mp3';
import testBox1SrcDe from 'url:../sounds/de/test-box-1.mp3';
import testBox2SrcDe from 'url:../sounds/de/test-box-2.mp3';

import touch1SrcEn from 'url:../sounds/en/touch-1.mp3';
import famHedge1SrcEn from 'url:../sounds/en/fam-hedge-1.mp3';
import testHedge1SrcEn from 'url:../sounds/en/test-hedge-1.mp3';
import testHedge2SrcEn from 'url:../sounds/en/test-hedge-2.mp3';
import famBox1SrcEn from 'url:../sounds/en/fam-box-1.mp3';
import testBox1SrcEn from 'url:../sounds/en/test-box-1.mp3';
import testBox2SrcEn from 'url:../sounds/en/test-box-2.mp3';

// import self-written functions
import logResponse from './logResponse';
import prepareTrial from './prepareTrial';
import changeGaze from './changeGaze';
import pause from './pause';
import randomizeTrials from './randomizeTrials';
import downloadData from './downloadData';
import checkForTouchscreen from './checkForTouchscreen';
import showSlide from './showSlide';
import openFullscreen from './openFullscreen';
import closeFullscreen from './closeFullscreen';
import experimentalInstructions from './experimentalInstructions';
import playFullAudio from './playFullAudio';
import getBrowserLang from './getBrowserLang';

// ---------------------------------------------------------------------------------------------------------------------
// DEVMODE?
// ---------------------------------------------------------------------------------------------------------------------
const devmode = false;

// ---------------------------------------------------------------------------------------------------------------------
// EXP OBJECT
// in this object, we save all of our variables, easier to pass on to functions
// NOTE: we do manipulate this object in our functions!
// ---------------------------------------------------------------------------------------------------------------------
const exp = {};

// ---------------------------------------------------------------------------------------------------------------------
// PARTICIPANT ID & TOUCH
// ---------------------------------------------------------------------------------------------------------------------
// get url object
const url = new URL(window.location.href);

exp.subjData = {};

// use id parameter’s value if available else use 'testID'
exp.subjData.touchScreen = checkForTouchscreen();
exp.subjData.subjID = url.searchParams.get('ID') || 'testID';
exp.subjData.inhouse = url.searchParams.get('inhouse') === 'true' || false;
exp.subjData.studyversion = url.searchParams.get('v') || 'hedge';
exp.subjData.webcam = url.searchParams.get('webcam') === 'true' || false;

// ---------------------------------------------------------------------------------------------------------------------
// CHECK WHETHER TOUCHSCREEN AND/OR iOS SAFARI
// ---------------------------------------------------------------------------------------------------------------------
DetectRTC.load(() => {
  exp.subjData.os = DetectRTC.osName;
  exp.subjData.mobile = DetectRTC.isMobileDevice;
  exp.subjData.browser = DetectRTC.browser.name;
  exp.subjData.browserVersion = JSON.stringify(DetectRTC.browser.version);
  exp.subjData.safari = DetectRTC.browser.isSafari || false;
  exp.subjData.iOSSafari = exp.subjData.mobile && exp.subjData.safari;
});

// ---------------------------------------------------------------------------------------------------------------------
// FOR DEMO: Conditional Recording based on URL Params (only if not iOS Safari)
// ---------------------------------------------------------------------------------------------------------------------
if (!exp.subjData.iOSSafari && exp.subjData.webcam) {
  mrec.startRecorder({
    audio: true,
    video: {
      frameRate: {
        min: 10,
        ideal: 25,
        max: 30,
      },
      width: {
        min: 640,
        ideal: 1280,
        max: 1920,
      },
      height: {
        min: 480,
        ideal: 720,
        max: 1080,
      },
      facingMode: 'user',
    },
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// LANGUAGE SETTINGS
// FOR DEMO: choose on welcome page which language
// ---------------------------------------------------------------------------------------------------------------------
exp.subjData.lang = url.searchParams.get('lang') || 'en';
// exp.subjData.lang = getBrowserLang();

let welcomeSrc;
let goodbyeSrc;
let promptGeneralSrc;
let promptHedgeSrc;
let promptBoxSrc;
let promptTouchSrc;
let promptTouchLongSrc;
let touch1Src;
let famHedge1Src;
let testHedge1Src;
let testHedge2Src;
let testHedge3Src;
let famBox1Src;
let testBox1Src;
let testBox2Src;
let testBox3Src;

switch (exp.subjData.lang) {
  case 'de':
    welcomeSrc = welcomeSrcDe;
    goodbyeSrc = goodbyeSrcDe;
    promptGeneralSrc = promptGeneralSrcDe;
    promptHedgeSrc = promptHedgeSrcDe;
    promptBoxSrc = promptBoxSrcDe;
    promptTouchSrc = promptTouchSrcDe;
    promptTouchLongSrc = promptTouchLongSrcDe;
    touch1Src = touch1SrcDe;
    famHedge1Src = famHedge1SrcDe;
    testHedge1Src = testHedge1SrcDe;
    testHedge2Src = testHedge2SrcDe;
    testHedge3Src = testHedge3SrcDe;
    famBox1Src = famBox1SrcDe;
    testBox1Src = testBox1SrcDe;
    testBox2Src = testBox2SrcDe;
    testBox3Src = testBox3SrcDe;
    break;
  case 'en':
    welcomeSrc = welcomeSrcEn;
    goodbyeSrc = goodbyeSrcEn;
    promptGeneralSrc = promptGeneralSrcEn;
    promptHedgeSrc = promptHedgeSrcEn;
    promptBoxSrc = promptBoxSrcEn;
    promptTouchSrc = promptTouchSrcEn;
    promptTouchLongSrc = promptTouchLongSrcEn;
    touch1Src = touch1SrcEn;
    famHedge1Src = famHedge1SrcEn;
    testHedge1Src = testHedge1SrcEn;
    testHedge2Src = testHedge2SrcEn;
    testHedge3Src = testHedge3SrcEn;
    famBox1Src = famBox1SrcEn;
    testBox1Src = testBox1SrcEn;
    testBox2Src = testBox2SrcEn;
    testBox3Src = testBox3SrcEn;
    break;
  default:
    console.log('error in importing sounds');
}

// ---------------------------------------------------------------------------------------------------------------------
// TRIAL SPECIFICATIONS
// ---------------------------------------------------------------------------------------------------------------------
exp.trials = {};
exp.trials.touchNr = 1;
exp.trials.famNr = devmode ? 1 : 2;
exp.trials.testNr = devmode ? 2 : 16;
exp.trials.totalNr = exp.trials.touchNr + exp.trials.famNr + exp.trials.testNr;
// this variable stores in which trial we currently are!
exp.trials.count = 0;
// NOTE: make sure, that the number of voice over fits to the nr of touch training, fam and test trials!!
exp.trials.voiceoverNr = devmode ? 0 : 1;
// constant number of boxes for PC version
exp.trials.boxVersion = 5;

// ---------------------------------------------------------------------------------------------------------------------
// SCREEN SIZE
// ---------------------------------------------------------------------------------------------------------------------
exp.subjData.offsetWidth = document.body.offsetWidth;
exp.subjData.offsetHeight = document.body.offsetHeight;

// ---------------------------------------------------------------------------------------------------------------------
// ADD INSTRUCTIONS TEXT
// ---------------------------------------------------------------------------------------------------------------------
// add text via rect => foreignObject => innerHTML
const foreignObjects = Array.from(
  document.querySelectorAll('[id^="foreign-object"]'),
);
foreignObjects.forEach((elem) => {
  const obj = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'foreignObject',
  );
  [...elem.attributes].map(({ name, value }) => obj.setAttribute(name, value));
  elem.replaceWith(obj);
});

const txt = experimentalInstructions(exp);

// ---------------------------------------------------------------------------------------------------------------------
// SAVE VIEWBOX VALUES
// ---------------------------------------------------------------------------------------------------------------------
// get viewBox size from whole SVG
exp.elemSpecs = {
  outerSVG: {
    ID: document.getElementById('outer-svg'),
    origViewBox: document.getElementById('outer-svg').getAttribute('viewBox'),
    origViewBoxX: parseFloat(
      document
        .getElementById('outer-svg')
        .getAttribute('viewBox')
        .split(' ')[0],
    ),
    origViewBoxY: parseFloat(
      document
        .getElementById('outer-svg')
        .getAttribute('viewBox')
        .split(' ')[1],
    ),
    origViewBoxWidth: parseFloat(
      document
        .getElementById('outer-svg')
        .getAttribute('viewBox')
        .split(' ')[2],
    ),
    origViewBoxHeight: parseFloat(
      document
        .getElementById('outer-svg')
        .getAttribute('viewBox')
        .split(' ')[3],
    ),
  },
};

// ---------------------------------------------------------------------------------------------------------------------
// SAVE DURATION OF AUDIO FILES
// ---------------------------------------------------------------------------------------------------------------------
exp.elemSpecs.animAudioDur = {};
const animAudioSrcs = [
  touch1Src,
  famHedge1Src,
  testHedge1Src,
  testHedge2Src,
  famBox1Src,
  testBox1Src,
  testBox2Src,
];

animAudioSrcs.forEach((src) => {
  const audioTmp = new Audio();
  audioTmp.src = src;
  audioTmp.onloadedmetadata = () => {
    exp.elemSpecs.animAudioDur[src] = audioTmp.duration;
  };
});

// ---------------------------------------------------------------------------------------------------------------------
// GET ALL RELEVANT ELEMENTS IN SVG
// ---------------------------------------------------------------------------------------------------------------------
const textslide = document.getElementById('textslide');
const textslideButton = document.getElementById('textslide-button');
const textslideButtonText = document.getElementById('textslide-button-text');
const experimentslide = document.getElementById('experimentslide');
const experimentslideButton = document.getElementById('experimentslide-button');

const clickBubble = document.getElementById('click-bubble');
const clickableArea = document.getElementById('clickable-area');
const speaker = document.getElementById('speaker');
const hedge = document.getElementById('hedge');
const boxes1Front = document.getElementById('boxes1-front');
const boxesAllFront = Array.from(document.querySelectorAll('[id$=-front]'));
const boxesAllBack = Array.from(document.querySelectorAll('[id$=-back]'));

boxesAllFront.forEach((box) => {
  box.setAttribute('visibility', 'hidden');
});
boxesAllBack.forEach((box) => {
  box.setAttribute('visibility', 'hidden');
});

// take first box as reference for box measurements
exp.elemSpecs.boxes = {
  width: boxes1Front.getBBox().width,
  height: boxes1Front.getBBox().height,
};

// if you change animal agents or targets, then change ID here...
const pig = document.getElementById('pig');
const monkey = document.getElementById('monkey');
const sheep = document.getElementById('sheep');
const agentsSingle = [pig, monkey, sheep];

// NOTE: we believe that all target objects are the same size here!!
const balloonBlue = document.getElementById('balloon-blue');
const balloonRed = document.getElementById('balloon-red');
const balloonYellow = document.getElementById('balloon-yellow');
const balloonGreen = document.getElementById('balloon-green');
const targetsSingle = [balloonBlue, balloonRed, balloonYellow, balloonGreen];

// save the original eye positions (so when eye is in the center)
exp.elemSpecs.eyes = {};
const agentsChar = ['pig', 'monkey', 'sheep'];
agentsChar.forEach((agent) => {
  exp.elemSpecs.eyes[agent] = {
    radius: document.getElementById(`${agent}-eyeline-left`).getAttribute('r'),
    left: {
      center: {
        x: document.getElementById(`${agent}-eyeline-left`).getAttribute('cx'),
        y: document.getElementById(`${agent}-eyeline-left`).getAttribute('cy'),
      },
      bbox: {
        x: document.getElementById(`${agent}-eyeline-left`).getBBox().x, // same as cx - r
        y: document.getElementById(`${agent}-eyeline-left`).getBBox().y, // same as cy - r
      },
    },
    right: {
      center: {
        x: document.getElementById(`${agent}-eyeline-right`).getAttribute('cx'),
        y: document.getElementById(`${agent}-eyeline-right`).getAttribute('cy'),
      },
      bbox: {
        x: document.getElementById(`${agent}-eyeline-right`).getBBox().x, // same as cx - r
        y: document.getElementById(`${agent}-eyeline-right`).getBBox().y, // same as cy - r
      },
    },
  };
});

// calculate some positions of the targets
exp.elemSpecs.targets = {
  center: {
    x: balloonBlue.getBBox().x,
    y: balloonBlue.getBBox().y,
  },
  // define coords from which point onwards the balloon is hidden behind hedge
  halfway: {
    // position mid, same as in center.x
    x: balloonBlue.getBBox().x,
    // BBox of hedge is a bit too high to hide balloon (because of single grass halms), therefore / 1.1
    y: exp.elemSpecs.outerSVG.origViewBoxHeight - hedge.getBBox().height / 1.1,
  },
  // right side of screen as upper boundary
  borderRight:
    exp.elemSpecs.outerSVG.origViewBoxWidth - balloonBlue.getBBox().width,
  // calculate y coords for balloon (-20 for little distance from lower border)
  groundY:
    exp.elemSpecs.outerSVG.origViewBoxHeight -
    balloonBlue.getBBox().height -
    20,
  // define y coord for target to be right above the boxes
  aboveBoxesY: boxes1Front.getBBox().y - balloonBlue.getBBox().height,
  // partlyInBoxesY: boxes1Front.getBBox().y - balloonBlue.getBBox().height / 3,
};

// ---------------------------------------------------------------------------------------------------------------------
// RANDOMIZATION OF AGENTS, TARGETS AND TARGET POSITIONS
// ---------------------------------------------------------------------------------------------------------------------
// create arrays with agents, targets, positions etc. for all the trials
randomizeTrials(exp, agentsSingle, targetsSingle);
if (devmode) console.log('exp object', exp);

// gsap timeline that will save our animation specifications
let timeline = null;
let targetClickTimer5sec = null;

// ---------------------------------------------------------------------------------------------------------------------
// UNLOCK AUDIOS
// ---------------------------------------------------------------------------------------------------------------------
exp.soundEffect = new Audio();

// event touchstart only works for touchscreens
// on first user interaction, later we adjust the source
document.body.addEventListener(
  'touchstart',
  () => {
    exp.soundEffect.play();
  },
  { capture: false, once: true },
);

// ---------------------------------------------------------------------------------------------------------------------
// DEFINE EVENTLISTENER FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// RUNS WHEN WELCOME BUTTON IS CLICKED
// ---------------------------------------------------------------------------------------------------------------------
// save in const variables in order to pass on event to function
const handleWelcomeClick = (event) => {
  event.preventDefault();
  document
    .getElementById('foreign-object-heading')
    .replaceChild(txt.instructionsTouchHeading, txt.welcomeHeading);
  document
    .getElementById('foreign-object-center-left')
    .replaceChild(txt.instructionsTouchParagraph, txt.welcomeParagraph);
  document
    .getElementById('foreign-object-center-right')
    .replaceChild(txt.instructionsTouchImage, txt.familyImage);

  switch (exp.subjData.lang) {
    case 'de':
      textslideButtonText.innerHTML = 'weiter';
      break;
    case 'en':
      textslideButtonText.innerHTML = 'continue';
      break;
    default:
      console.log('error in setting textslideButtonText');
  }

  if (devmode) {
    showSlide([speaker], []);
  } else {
    showSlide([speaker], [textslideButton]);
    // enable fullscreen mode
    openFullscreen();
  }
  textslideButton.addEventListener('click', handleTransitionClick, {
    capture: false,
    once: true,
  });
};
// ---------------------------------------------------------------------------------------------------------------------
// RUNS WHEN TRANSITION BUTTON IS CLICKED (between touch, fam and test trials)
// ---------------------------------------------------------------------------------------------------------------------
const handleTransitionClick = (event) => {
  event.preventDefault();

  showSlide(
    [experimentslide],
    [textslide, textslideButton, clickBubble, speaker],
  );

  prepareTrial(exp);
  timeline = gsap.timeline({ paused: true });
  timeline.add(changeGaze(exp));
  exp.responseLog[exp.trials.count].durationAnimationComplete =
    timeline.duration();
};

// ---------------------------------------------------------------------------------------------------------------------
// RUNS WHEN GOODBYE BUTTON IS CLICKED
// ---------------------------------------------------------------------------------------------------------------------
const handleGoodbyeClick = async function tmp(event) {
  event.preventDefault();

  // pause audio
  exp.soundEffect.pause();
  exp.soundEffect.currentTime = 0;

  // disable fullscreen mode
  if (!devmode) {
    closeFullscreen();
  }

  window.location.replace(
    `https://ccp-odc.eva.mpg.de/tango-demo/goodbye.html?ID=${exp.subjData.subjID}`,
  );
};
// ---------------------------------------------------------------------------------------------------------------------
// RUNS WHEN "weiter" BUTTON IS CLICKED
// ---------------------------------------------------------------------------------------------------------------------
const handleExperimentslideButtonClick = async function tmp(event) {
  event.preventDefault();

  if (devmode) console.log('');
  if (devmode) console.log('trial: ', exp.trials.count);

  // hide blurr canvas and button
  showSlide(
    [],
    [experimentslideButton, document.getElementById('cover-blurr')],
  );

  // set event listener to see whether participants click too early
  exp.elemSpecs.outerSVG.ID.addEventListener('click', handleEarlyClick, false);

  // animate balloon & eye movement to randomized positions
  await timeline.play();
  await pause(200);

  // for any trial without voiceover
  if (!exp.trials.voiceover[exp.trials.count]) {
    exp.soundEffect.src = promptGeneralSrc;
    exp.soundEffect.play();

    // for touch trials with voiceover
  } else if (exp.trials.type[exp.trials.count] === 'touch') {
    await playFullAudio(exp.soundEffect, promptTouchLongSrc);

    // for tablet hedge version fam trials with voiceover
  } else if (
    exp.trials.type[exp.trials.count] === 'fam' &&
    exp.trials.boxesNr[exp.trials.count] === 0
  ) {
    await playFullAudio(exp.soundEffect, promptHedgeSrc);

    // for tablet hedge version test trials with voiceover
  } else if (
    exp.trials.type[exp.trials.count] === 'test' &&
    exp.trials.boxesNr[exp.trials.count] === 0
  ) {
    await playFullAudio(exp.soundEffect, testHedge3Src);

    // for PC box version fam trials with voice over
  } else if (
    exp.trials.type[exp.trials.count] === 'fam' &&
    exp.trials.boxesNr[exp.trials.count] > 0
  ) {
    await playFullAudio(exp.soundEffect, promptBoxSrc);

    // for PC box version test trials with voice over
  } else if (
    exp.trials.type[exp.trials.count] === 'test' &&
    exp.trials.boxesNr[exp.trials.count] > 0
  ) {
    await playFullAudio(exp.soundEffect, testBox3Src);
  }

  // save current time to calculate response time later
  exp.responseLog[exp.trials.count].responseTime = {
    t0: new Date().getTime(),
    t1: 0,
  };

  targetClickTimer5sec = window.setTimeout(noTargetClickWithin5sec, 5000);

  // remove event listener that checks whether participants clicked too early
  exp.elemSpecs.outerSVG.ID.removeEventListener(
    'click',
    handleEarlyClick,
    false,
  );

  // for touch trials, particiapnts can click in clickable area
  if (exp.trials.type[exp.trials.count] === 'touch') {
    clickableArea.setAttribute('pointer-events', 'all');
    clickableArea.addEventListener('click', handleTargetClick, {
      capture: false,
      once: true,
    });

    // for trials with hedge, participants shoudl click on there
  } else if (exp.trials.boxesNr[exp.trials.count] === 0) {
    clickableArea.setAttribute('pointer-events', 'none');
    hedge.addEventListener('click', handleTargetClick, {
      capture: false,
      once: true,
    });

    // for trials with boxes, participants should click on them
  } else if (exp.trials.boxesNr[exp.trials.count] > 0) {
    const boxesCurrentFront = document.querySelector(
      `[id$= "boxes${exp.trials.boxesNr[exp.trials.count]}-front"]`,
    );
    const boxesCurrentBack = document.querySelector(
      `[id$= "boxes${exp.trials.boxesNr[exp.trials.count]}-back"]`,
    );

    clickableArea.setAttribute('pointer-events', 'none');
    boxesCurrentFront.addEventListener('click', handleTargetClick, {
      capture: false,
      once: true,
    });
    boxesCurrentBack.addEventListener('click', handleTargetClick, {
      capture: false,
      once: true,
    });
  }

  exp.elemSpecs.outerSVG.ID.addEventListener(
    'click',
    handleWrongAreaClick,
    false,
  );
};
// ---------------------------------------------------------------------------------------------------------------------
// RUNS WHEN TARGET (HEDGE OR BOX) IS CLICKED
// ---------------------------------------------------------------------------------------------------------------------
// async so we can await animation!
const handleTargetClick = async function tmp(event) {
  // stop audio that is potentially playing
  exp.soundEffect.pause();
  exp.soundEffect.currentTime = 0;

  // we save current time, so that we can calculate response time
  exp.responseLog[exp.trials.count].responseTime.t1 = new Date().getTime();

  // clear timer that awaits participant's click
  // otherwise, it will run even after target click
  clearTimeout(targetClickTimer5sec);

  // remove eventListener that was responsible for "wrong input" sound
  exp.elemSpecs.outerSVG.ID.removeEventListener(
    'click',
    handleWrongAreaClick,
    false,
  );
  event.preventDefault();

  // function to save all relevant information
  logResponse(event, exp);
  if (devmode) console.log('responseLog: ', exp.responseLog[exp.trials.count]);

  // NOT NEEDED FOR LOCAL DOWNLOADING
  // just for safety: upload data to server already
  // if participants passed touch+fam training and at least 4 test trials
  // if (exp.trials.count >= exp.trials.touchNr + exp.trials.famNr + 4) {
  //   devmode ? console.log('download data for safety') : downloadData(exp.responseLog, exp.subjData.subjID);
  // }

  // so that we don't rush into next trial
  await pause(500);

  // prepare next trial
  exp.trials.count += 1;

  // then depending on trialcount, decide what happens next...
  // for touch trials
  if (exp.trials.count < exp.trials.touchNr) {
    prepareTrial(exp);
    timeline = gsap.timeline({ paused: true });
    timeline.add(changeGaze(exp));
    exp.responseLog[exp.trials.count].durationAnimationComplete =
      timeline.duration();

    // for transition from touching into familiarization
  } else if (exp.trials.count === exp.trials.touchNr) {
    document
      .getElementById('foreign-object-heading')
      .replaceChild(txt.instructionsFamHeading, txt.instructionsTouchHeading);
    document
      .getElementById('foreign-object-center-left')
      .replaceChild(
        txt.instructionsFamParagraph,
        txt.instructionsTouchParagraph,
      );
    document
      .getElementById('foreign-object-center-right')
      .replaceChild(txt.instructionsFamImage, txt.instructionsTouchImage);

    textslideButton.addEventListener('click', handleTransitionClick, {
      capture: false,
      once: true,
    });

    showSlide(
      [textslide, textslideButton],
      [
        experimentslide,
        hedge,
        pig,
        monkey,
        sheep,
        balloonBlue,
        balloonRed,
        balloonYellow,
        balloonGreen,
        speaker,
      ],
    );

    // if last trial had boxes, then hide them!
    if (exp.trials.boxesNr[exp.trials.count - 1] > 0) {
      const boxesCurrentFront = document.querySelector(
        `[id$= "boxes${exp.trials.boxesNr[exp.trials.count - 1]}-front"]`,
      );
      const boxesCurrentBack = document.querySelector(
        `[id$= "boxes${exp.trials.boxesNr[exp.trials.count - 1]}-back"]`,
      );
      showSlide([], [boxesCurrentFront, boxesCurrentBack]);
    }

    // for familiarization trials
  } else if (exp.trials.count < exp.trials.touchNr + exp.trials.famNr) {
    prepareTrial(exp);
    timeline = gsap.timeline({ paused: true });
    timeline.add(changeGaze(exp));
    exp.responseLog[exp.trials.count].durationAnimationComplete =
      timeline.duration();

    // for transition from familiarization to test trials
  } else if (exp.trials.count === exp.trials.touchNr + exp.trials.famNr) {
    document
      .getElementById('foreign-object-heading')
      .replaceChild(txt.instructionsTestHeading, txt.instructionsFamHeading);
    document
      .getElementById('foreign-object-center-left')
      .replaceChild(
        txt.instructionsTestParagraph,
        txt.instructionsFamParagraph,
      );
    document
      .getElementById('foreign-object-center-right')
      .replaceChild(txt.instructionsTestImage, txt.instructionsFamImage);

    textslideButton.addEventListener('click', handleTransitionClick, {
      capture: false,
      once: true,
    });

    showSlide(
      [textslide, textslideButton],
      [
        experimentslide,
        hedge,
        pig,
        monkey,
        sheep,
        balloonBlue,
        balloonRed,
        balloonYellow,
        balloonGreen,
        speaker,
      ],
    );

    // if last trial had boxes, then hide them!
    if (exp.trials.boxesNr[exp.trials.count - 1] > 0) {
      const boxesCurrentFront = document.querySelector(
        `[id$= "boxes${exp.trials.boxesNr[exp.trials.count - 1]}-front"]`,
      );
      const boxesCurrentBack = document.querySelector(
        `[id$= "boxes${exp.trials.boxesNr[exp.trials.count - 1]}-back"]`,
      );
      showSlide([], [boxesCurrentFront, boxesCurrentBack]);
    }

    // for test trials
  } else if (exp.trials.count < exp.trials.totalNr) {
    prepareTrial(exp);
    timeline = gsap.timeline({ paused: true });
    timeline.add(changeGaze(exp));
    exp.responseLog[exp.trials.count].durationAnimationComplete =
      timeline.duration();

    // for goodbye after test trials
  } else if (exp.trials.count === exp.trials.totalNr) {
    // hide everything for duration of video uploading
    showSlide(
      [],
      [
        experimentslide,
        hedge,
        pig,
        monkey,
        sheep,
        balloonBlue,
        balloonRed,
        balloonYellow,
        balloonGreen,
        textslideButton,
      ],
    );

    // if last trial had boxes, then hide them!
    if (exp.trials.boxesNr[exp.trials.count - 1] > 0) {
      const boxesCurrentFront = document.querySelector(
        `[id$= "boxes${exp.trials.boxesNr[exp.trials.count - 1]}-front"]`,
      );
      const boxesCurrentBack = document.querySelector(
        `[id$= "boxes${exp.trials.boxesNr[exp.trials.count - 1]}-back"]`,
      );
      showSlide([], [boxesCurrentFront, boxesCurrentBack]);
    }

    // save data, download locally
    downloadData(exp.responseLog, exp.subjData.subjID);

    // save the video locally
    if (!exp.subjData.iOSSafari && exp.subjData.webcam) {
      mrec.stopRecorder();

      // give some time to create Video Blob

      const day = new Date().toISOString().substr(0, 10);
      const time = new Date().toISOString().substr(11, 8);

      setTimeout(
        () =>
          mrec.downloadVideo(
            `balloontask-${exp.subjData.subjID}-${day}-${time}`,
          ),
        1000,
      );
    }

    // NOT NEEDED FOR DEMO
    // if (!exp.subjData.iOSSafari) await endRecording();

    document
      .getElementById('foreign-object-heading')
      .replaceChild(txt.goodbyeHeading, txt.instructionsTestHeading);
    document
      .getElementById('foreign-object-center-left')
      .replaceChild(txt.goodbyeParagraph, txt.instructionsTestParagraph);
    document
      .getElementById('foreign-object-center-right')
      .replaceChild(txt.familyImage, txt.instructionsTestImage);

    textslideButton.addEventListener('click', handleGoodbyeClick, {
      capture: false,
      once: true,
    });

    switch (exp.subjData.lang) {
      case 'de':
        textslideButtonText.innerHTML = 'weiter';
        break;
      case 'en':
        textslideButtonText.innerHTML = 'continue';
        break;
      default:
        console.log('error in setting textslideButtonText');
    }

    showSlide(
      [textslide, speaker, textslideButton],
      [
        experimentslide,
        hedge,
        pig,
        monkey,
        sheep,
        balloonBlue,
        balloonRed,
        balloonYellow,
        balloonGreen,
      ],
    );
  }
};
// ---------------------------------------------------------------------------------------------------------------------
// RUNS WHEN WRONG CLICK
// ---------------------------------------------------------------------------------------------------------------------
const handleEarlyClick = (event) => {
  event.preventDefault();
  exp.responseLog[exp.trials.count].earlyClick++;
};

const handleWrongAreaClick = (event) => {
  event.preventDefault();
  // from participant screen size, calculate where there was a click
  const screenScalingHeight =
    exp.elemSpecs.outerSVG.origViewBoxHeight / exp.subjData.offsetHeight;
  const clickY =
    event.clientY - exp.elemSpecs.outerSVG.ID.getBoundingClientRect().top;
  const clickScaledY = screenScalingHeight * clickY;
  if (clickScaledY < hedge.getBBox().y) {
    // count how often a participant clicked in the wrong area
    exp.responseLog[exp.trials.count].wrongAreaClick++;
  }
};
// ---------------------------------------------------------------------------------------------------------------------
// RUNS WHEN SPEAKER IN INSTRUCTIONS HAS BEEN CLICKED
// ---------------------------------------------------------------------------------------------------------------------
const handleSpeakerClick = async function tmp(event) {
  event.preventDefault();

  if (exp.trials.count === 0) {
    // play instructions audio, only show button once audio is finished playing
    showSlide([], [textslideButton]);
    await playFullAudio(exp.soundEffect, welcomeSrc);
    showSlide([textslideButton], []);
    // for goodbye message
  } else if (exp.trials.count === exp.trials.totalNr) {
    await playFullAudio(exp.soundEffect, goodbyeSrc);
  }
};

// ---------------------------------------------------------------------------------------------------------------------
// RUNS WHEN PARTICIPANT HASN'T CLICKED WITHIN CERTAIN AMOUNT OF TIME
// ---------------------------------------------------------------------------------------------------------------------
const noTargetClickWithin5sec = () => {
  if (exp.trials.type[exp.trials.count] === 'touch') {
    exp.soundEffect.src = promptTouchSrc;
    exp.soundEffect.play();
  } else if (
    exp.trials.type[exp.trials.count] !== 'touch' &&
    exp.trials.boxesNr[exp.trials.count] === 0
  ) {
    exp.soundEffect.src = promptHedgeSrc;
    exp.soundEffect.play();
  } else if (
    exp.trials.type[exp.trials.count] !== 'touch' &&
    exp.trials.boxesNr[exp.trials.count] > 0
  ) {
    exp.soundEffect.src = promptBoxSrc;
    exp.soundEffect.play();
  }
};
// ---------------------------------------------------------------------------------------------------------------------
// ACTUALLY RUNNING:
// ---------------------------------------------------------------------------------------------------------------------
// INSTRUCTIONS: show slide
document
  .getElementById('foreign-object-heading')
  .appendChild(txt.welcomeHeading);
document
  .getElementById('foreign-object-center-left')
  .appendChild(txt.welcomeParagraph);
document
  .getElementById('foreign-object-center-right')
  .appendChild(txt.familyImage);

showSlide(
  [textslide],
  // first hide buttons, participants can only start once they listened to the instructions
  [experimentslide, speaker, clickableArea],
);

// add event listeners
textslideButton.addEventListener('click', handleWelcomeClick, {
  capture: false,
  once: true,
});
experimentslideButton.addEventListener(
  'click',
  handleExperimentslideButtonClick,
  { capture: false },
);
speaker.addEventListener('click', handleSpeakerClick, {
  capture: false,
  once: false,
});

// initially check device orientation
if (window.innerHeight > window.innerWidth) {
  // eslint-disable-next-line no-alert
  alert(`${txt.landscapemode}`);
}

// detect device orientation changes and alert, if portrait mode is used instead of landscape
window.addEventListener('orientationchange', () => {
  const afterOrientationChange = () => {
    // eslint-disable-next-line no-alert
    if (window.innerHeight > window.innerWidth) alert(`${txt.landscapemode}`);
  };
  // the orientationchange event is triggered before the rotation is complete.
  // therefore, await resize and then evaluate innerHeight & innerWidth
  window.addEventListener('resize', afterOrientationChange, {
    capture: false,
    once: true,
  });
});
