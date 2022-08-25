/* eslint-disable no-case-declarations */
import { gsap } from 'gsap';
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

// language independent
import blinkSrc from 'url:../sounds/de/blink.mp3';
import balloonLandsSrc from 'url:../sounds/de/balloon-lands.mp3';

import playFullAudio from './playFullAudio';

// ---------------------------------------------------------------------------------------------------------------------
// FUNCTION FOR ANIMATING BALLOON, EYES, HEDGE
// NOTE: we only return the gsap timeline object.
// that means that anything outside of that has no effect!!
// ---------------------------------------------------------------------------------------------------------------------
export default (exp) => {
  let touch1Src;
  let famHedge1Src; let testHedge1Src; let testHedge2Src;
  let famBox1Src; let testBox1Src; let testBox2Src;

  switch (exp.subjData.lang) {
    case 'de':
      touch1Src = touch1SrcDe;
      famHedge1Src = famHedge1SrcDe;
      testHedge1Src = testHedge1SrcDe;
      testHedge2Src = testHedge2SrcDe;
      famBox1Src = famBox1SrcDe;
      testBox1Src = testBox1SrcDe;
      testBox2Src = testBox2SrcDe;
      break;
    case 'en':
      touch1Src = touch1SrcEn;
      famHedge1Src = famHedge1SrcEn;
      testHedge1Src = testHedge1SrcEn;
      testHedge2Src = testHedge2SrcEn;
      famBox1Src = famBox1SrcEn;
      testBox1Src = testBox1SrcEn;
      testBox2Src = testBox2SrcEn;
      break;
    default:
      console.log('error in importing sounds');
  }

  // get relevant elements
  const currentAgent = `${exp.agents[exp.trials.count].getAttribute('id')}`;
  const pupilLeft = document.getElementById(`${currentAgent}-pupil-left`);
  const pupilRight = document.getElementById(`${currentAgent}-pupil-right`);
  const irisLeft = document.getElementById(`${currentAgent}-iris-left`);
  const irisRight = document.getElementById(`${currentAgent}-iris-right`);
  const hedge = document.getElementById('hedge');

  // we use gsap3 for animation
  const timeline = gsap.timeline({ paused: true });
  // general delay
  const delay = 0.5;
  const hedgeDuration = 0.2;

  // -------------------------------------------------------------------------------------------------------------------
  // define common movements/ animations
  // -------------------------------------------------------------------------------------------------------------------
  const attentionGetter = gsap.timeline({ paused: true });
  attentionGetter
    . to([pupilLeft, pupilRight, irisLeft, irisRight], {
      scale: 1.3,
      opacity: 0.75,
      duration: 0.3,
      transformOrigin: '50% 50%',
      onStart: async function onStart() {
        await playFullAudio(exp.soundEffect, blinkSrc);
        // already set source for balloon landing here, so that sound is already preloaded
        exp.soundEffect.src = balloonLandsSrc;
      },
    }, '<')
    .set([exp.agents[exp.trials.count], pupilLeft, pupilRight, irisLeft, irisRight], {
      scale: 1,
      opacity: 1,
    });

  const ballonToGround = gsap.timeline({ paused: true });
  ballonToGround
    .to(exp.targets[exp.trials.count], {
      duration: exp.responseLog[exp.trials.count].durationAnimationBalloonTotal,
      ease: 'none',
      x: exp.elemSpecs.targets.centerFinal.x,
      y: exp.elemSpecs.targets.centerFinal.y,
    })
    .to([pupilLeft, irisLeft], {
      duration: exp.responseLog[exp.trials.count].durationAnimationBalloonTotal,
      ease: 'none',
      x: exp.elemSpecs.eyes[currentAgent].left.centerFinal.x,
      y: exp.elemSpecs.eyes[currentAgent].left.centerFinal.y,
    }, '<')
    .to([pupilRight, irisRight], {
      duration: exp.responseLog[exp.trials.count].durationAnimationBalloonTotal,
      ease: 'none',
      x: exp.elemSpecs.eyes[currentAgent].right.centerFinal.x,
      y: exp.elemSpecs.eyes[currentAgent].right.centerFinal.y,
      onComplete() { exp.soundEffect.play(); },
    }, '<');

  const ballonIntoBox = gsap.timeline({ paused: true });
  ballonIntoBox
    .to(exp.targets[exp.trials.count], {
      duration: exp.responseLog[exp.trials.count].durationAnimationBalloonCenterBox,
      ease: 'none',
      x: exp.elemSpecs.targets.centerBox.x,
      y: exp.elemSpecs.targets.centerBox.y,
    })
    .to([pupilLeft, irisLeft], {
      duration: exp.responseLog[exp.trials.count].durationAnimationBalloonTotal,
      ease: 'none',
      x: exp.elemSpecs.eyes[currentAgent].left.centerFinal.x,
      y: exp.elemSpecs.eyes[currentAgent].left.centerFinal.y,
    }, '<')
    .to([pupilRight, irisRight], {
      duration: exp.responseLog[exp.trials.count].durationAnimationBalloonTotal,
      ease: 'none',
      x: exp.elemSpecs.eyes[currentAgent].right.centerFinal.x,
      y: exp.elemSpecs.eyes[currentAgent].right.centerFinal.y,
    }, '<')
    .to(exp.targets[exp.trials.count], {
      duration: exp.responseLog[exp.trials.count].durationAnimationBalloonBoxFinal,
      ease: 'none',
      y: exp.elemSpecs.targets.centerFinal.y,
      onComplete() { exp.soundEffect.play(); },
    }, `-=${exp.responseLog[exp.trials.count].durationAnimationBalloonBoxFinal}`);

  // -------------------------------------------------------------------------------------------------------------------
  // function for setting audio source and playing sound
  // -------------------------------------------------------------------------------------------------------------------
  function playSound(src) {
    exp.soundEffect.src = src;
    exp.soundEffect.play();
  }

  // -------------------------------------------------------------------------------------------------------------------
  // define animation depending on trial type
  // -------------------------------------------------------------------------------------------------------------------
  // for touch training trials
  if (exp.trials.type[exp.trials.count] === 'touch') {
    // for instructions voice over
    if (exp.trials.voiceover[exp.trials.count]) {
      timeline.eventCallback('onStart', playSound, [touch1Src]);
      attentionGetter.delay(exp.elemSpecs.animAudioDur[touch1Src] + delay);
    }
    attentionGetter.play();
    ballonToGround.play();
    timeline
      .add(attentionGetter, `+=${delay}`)
      .add(ballonToGround, `+=${delay}`);

  // for tablet hedge version fam trials
  } else if (exp.trials.boxesNr[exp.trials.count] === 0 && exp.trials.type[exp.trials.count] === 'fam') {
    const hedgeSetHalfWay = gsap.set(hedge, {
      y: hedge.getBBox().height - exp.targets[exp.trials.count].getBBox().height - 75,
    });

    if (exp.trials.voiceover[exp.trials.count]) {
      timeline.eventCallback('onStart', playSound, [famHedge1Src]);
      attentionGetter.delay(exp.elemSpecs.animAudioDur[famHedge1Src] + delay);
    }
    attentionGetter.play();
    ballonToGround.play();

    timeline
      .add(hedgeSetHalfWay)
      .add(attentionGetter, `+=${delay}`)
      .add(ballonToGround, `+=${delay}`); c;

  // for tablet hedge version test trials
  } else if (exp.trials.boxesNr[exp.trials.count] === 0 && exp.trials.type[exp.trials.count] === 'test') {
    const hedgeHalfDown = gsap.to(hedge, {
      y: hedge.getBBox().height - exp.targets[exp.trials.count].getBBox().height - 75,
      duration: hedgeDuration,
      ease: 'none',
    });

    const hedgeUp = gsap.fromTo(hedge, {
      y: hedge.getBBox().height - exp.targets[exp.trials.count].getBBox().height - 75,
    }, {
      y: 0,
      duration: hedgeDuration,
      ease: 'none',
    });

    if (exp.trials.voiceover[exp.trials.count]) {
      timeline.eventCallback('onStart', playSound, [testHedge1Src]);
      hedgeUp.delay(exp.elemSpecs.animAudioDur[testHedge1Src] + delay);
      hedgeUp.eventCallback('onComplete', playSound, [testHedge2Src]);
      attentionGetter.delay(exp.elemSpecs.animAudioDur[testHedge2Src] + delay);
    }
    hedgeUp.play();
    attentionGetter.play();
    ballonToGround.play();
    hedgeHalfDown.play();

    timeline
      .add(hedgeUp, `+=${delay}`)
      .add(attentionGetter, `+=${delay}`)
      .add(ballonToGround, `+=${delay}`)
      .add(hedgeHalfDown, `+=${delay}`);

  // for PC box version fam trials
  } else if (exp.trials.boxesNr[exp.trials.count] > 0 && exp.trials.type[exp.trials.count] === 'fam') {
    if (exp.trials.voiceover[exp.trials.count]) {
      timeline.eventCallback('onStart', playSound, [famBox1Src]);
      attentionGetter.delay(exp.elemSpecs.animAudioDur[famBox1Src] + delay);
    }
    attentionGetter.play();
    ballonIntoBox.play();
    timeline
      .add(attentionGetter, `+=${delay}`)
      .add(ballonIntoBox, `+=${delay}`);

  // for PC box version test trials
  } else if (exp.trials.boxesNr[exp.trials.count] > 0 && exp.trials.type[exp.trials.count] === 'test') {
    const hedgeDown = gsap.to(hedge, {
      y: hedge.getBBox().height,
      duration: hedgeDuration,
      ease: 'none',
    });

    const hedgeWholeWayUp = gsap.fromTo(hedge, {
      y: hedge.getBBox().height,
    }, {
      y: 0,
      duration: hedgeDuration,
      ease: 'none',
    });

    if (exp.trials.voiceover[exp.trials.count]) {
      timeline.eventCallback('onStart', playSound, [testBox1Src]);
      hedgeWholeWayUp.delay(exp.elemSpecs.animAudioDur[testBox1Src] + delay);
      hedgeWholeWayUp.eventCallback('onComplete', playSound, [testBox2Src]);
      attentionGetter.delay(exp.elemSpecs.animAudioDur[testBox2Src] + delay);
    }
    hedgeWholeWayUp.play();
    attentionGetter.play();
    ballonIntoBox.play();
    hedgeDown.play();

    timeline
      .add(hedgeWholeWayUp, `+=${delay}`)
      .add(attentionGetter, `+=${delay}`)
      .add(ballonIntoBox, `+=${delay}`)
      .add(hedgeDown, `+=${delay}`);
  }

  timeline.play();
  return (timeline);
};
