import _ from 'lodash';
import Game from './game';
import AFDDataBase from './database';
import * as Util from "./util";

window.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM LOADED");

  if (window.indexedDB) {
    console.log("IndexedDB detected");
  }else {
    console.log("NO IndexedDB detected for this browser");
  }

  function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  };
  window.isDeviceMobile = isMobileDevice();
  if (window.isDeviceMobile){
    alert("Your current viewing device may not properly display this page!")
  }
  console.log(`isMobileDevice = ${window.isDeviceMobile}`);


  const updateCanvasSize = () => {
    console.log(`Device orientation changed!`);
    const canvasContainer = document.getElementsByClassName("canvas-container")[0];
    canvasEl.height = canvasContainer.clientHeight;
    canvasEl.width = canvasContainer.clientWidth;
  }

  // const canvasEl = document.getElementsByTagName("canvas")[0];
  let canvasEl = document.getElementsByTagName("canvas")[0];
  if (!canvasEl){
    const canvasContainer = document.getElementsByClassName("canvas-container")[0];
    canvasEl = document.createElement("CANVAS");
    canvasEl.setAttribute("id","canvas-id");
    if (window.isDeviceMobile) {
      // if ("orientation" in screen) {
      //   debugger
      //   screen.orientation.lock(screen.orientation.type);
      // }
      // ScreenOrientation.lock("portrait");
      canvasEl.height = canvasContainer.clientHeight;
      canvasEl.width = canvasContainer.clientWidth;
      // window.addEventListener('deviceorientation', () => {
      //   updateCanvasSize()
      // });  
    }else {
      canvasEl.height = 720;
      canvasEl.width = 1280; 
    }
    canvasContainer.appendChild(canvasEl);
  }


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
  const bg_8 = new Image();
  const bg_9 = new Image();
  const bg_10 = new Image();
  const bg_11 = new Image();
  const bg_12 = new Image();
  const bg_13 = new Image();
  bg_1.src = assetPath + "bg_1.jpg";
  bg_2.src = assetPath + "bg_2.jpeg";
  bg_3.src = assetPath + "bg_3.jpg";
  bg_4.src = assetPath + "bg_4.png";
  bg_5.src = assetPath + "bg_5.png";
  bg_6.src = assetPath + "bg_6.jpg";
  bg_7.src = assetPath + "bg_7.jpeg";
  bg_8.src = assetPath + "bg_8.jpeg";
  bg_9.src = assetPath + "bg_9.jpeg";
  bg_10.src = assetPath + "bg_10.jpeg";
  bg_11.src = assetPath + "bg_11.jpeg";
  bg_12.src = assetPath + "bg_12.jpeg";
  bg_13.src = assetPath + "bg_13.jpeg";
  window.backgroundImages.push(bg_1);
  window.backgroundImages.push(bg_2);
  window.backgroundImages.push(bg_3);
  window.backgroundImages.push(bg_4);
  window.backgroundImages.push(bg_5);
  window.backgroundImages.push(bg_6);
  window.backgroundImages.push(bg_7);
  window.backgroundImages.push(bg_8);
  window.backgroundImages.push(bg_9);
  window.backgroundImages.push(bg_10);
  window.backgroundImages.push(bg_11);
  window.backgroundImages.push(bg_12);
  window.backgroundImages.push(bg_13);

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
  const eye_3 = new Image();
  eye_1.src = assetPath + "eye_1.gif";
  eye_2.src = assetPath + "eye_2.gif";
  eye_2.src = assetPath + "eye_3.gif";
  window.eyes.push(eye_1);
  window.eyes.push(eye_2);
  window.eyes.push(eye_3);


// const theThing = document.querySelector("#thing");
// canvasEl.addEventListener("click", getClickPosition, false);

  window.getPosition = getPosition;

  function getClickPosition(e) {
    const parentPosition = getPosition(canvasEl);
    const xPosition = e.clientX - parentPosition.x - theThing.clientWidth / 2;
    const yPosition = e.clientY - parentPosition.y - theThing.clientHeight / 2;

    theThing.style.left = xPosition + "px";
    theThing.style.top = yPosition + "px";
  }

  window.game = new Game(canvasEl);
  window.game.Init();
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