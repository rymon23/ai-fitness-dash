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
  bg_6.src = assetPath + "bg_6.jpeg";
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


  window.images = [];
  window.patterns = [];
  const pattern = new Image();
  pattern.src = assetPath + "pattern_2.jpg";
  window.patterns.push(pattern);

  const patternWall = new Image();
  patternWall.src = assetPath + "pattern_5.jpg";
  window.patterns.push(patternWall);

  window.game = new Game(canvasEl);
})