import _ from 'lodash';
import Game from './game';

const updateElementValue = (elementId, newVal, callBack = null) => {
  document.getElementById(elementId).innerHTML = newVal;
  if (callBack){
    callBack(newVal);
  }
}


window.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM LOADED");
  const canvasEl = document.getElementsByTagName("canvas")[0];

  //CANVAS BACKGROUND
  const assetPath = "./src/assets/";
  window.assetPath = assetPath;
  window.backgroundImages = [];
  const bg_1 = new Image();
  const bg_2 = new Image();
  const bg_3 = new Image();
  const bg_4 = new Image();
  const bg_5 = new Image();
  const bg_6 = new Image();
  const bg_7 = new Image();
  bg_1.src = assetPath + "bg_1.jpg";
  bg_2.src = assetPath + "bg_2.jpg";
  bg_3.src = assetPath + "bg_3.jpg";
  bg_4.src = assetPath + "bg_4.png";
  bg_5.src = assetPath + "bg_5.png";
  bg_6.src = assetPath + "bg_6.jpg";
  bg_7.src = assetPath + "bg_7.jpeg";
  window.backgroundImages.push(bg_1);
  window.backgroundImages.push(bg_2);
  window.backgroundImages.push(bg_3);
  window.backgroundImages.push(bg_4);
  window.backgroundImages.push(bg_5);
  window.backgroundImages.push(bg_6);
  window.backgroundImages.push(bg_7);

  //WALL PATTERNS
  window.wallPatterns = [];
  const wp_1 = new Image();
  const wp_2 = new Image();
  wp_1.src = assetPath + "wp_1.jpg";
  wp_2.src = assetPath + "wp_2.jpg";
  window.wallPatterns.push(wp_1);
  window.wallPatterns.push(wp_2);

  //EYES
  window.eyes = [];
  const eye_1 = new Image();
  const eye_2 = new Image();
  eye_1.src = assetPath + "eye_1.gif";
  eye_2.src = assetPath + "eye_2.gif";
  window.eyes.push(eye_1);
  window.eyes.push(eye_2);

  //PATTERNS
  window.patterns = [];
  const p_1 = new Image();
  const p_2 = new Image();
  const p_3 = new Image();
  p_1.src = assetPath + "p_1.jpg";
  p_2.src = assetPath + "p_2.jpg";
  p_3.src = assetPath + "p_3.jpg";
  window.patterns.push(p_1);
  window.patterns.push(p_2);
  window.patterns.push(p_3);

  const patternWall = new Image();
  patternWall.src = assetPath + "pattern_5.jpg";
  window.patterns.push(patternWall);

  // debugger
  // if (window.sessionID){
  //   alert(`Last session id: ${window.sessionID.id}`);
  //   window.sessionID.id = window.sessionID.id + 1;
  // }else{
  //     window.sessionID = { id: 1};
  // }


const theThing = document.querySelector("#thing");
const container = document.querySelector("#contentContainer");

// container.addEventListener("click", getClickPosition, false);
canvasEl.addEventListener("click", getClickPosition, false);

window.getPosition = getPosition;

function getClickPosition(e) {
  const parentPosition = getPosition(canvasEl);
  const xPosition = e.clientX - parentPosition.x - theThing.clientWidth / 2;
  const yPosition = e.clientY - parentPosition.y - theThing.clientHeight / 2;

  theThing.style.left = xPosition + "px";
  theThing.style.top = yPosition + "px";
}

  window.game = new Game(canvasEl);
})

// Helper function to get an element's exact position
export const getPosition = (el) => {
  let xPos = 0;
  let yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      let yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}