import _ from 'lodash';
import Game from './game';

const updateElementValue = (elementId, newVal, callBack = null) => {
  // debugger
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
  bg_1.src = assetPath + "bg_1.jpg";
  bg_2.src = assetPath + "bg_2.jpg";
  bg_3.src = assetPath + "bg_3.jpg";
  bg_4.src = assetPath + "bg_4.jpg";
  window.backgroundImages.push(bg_1);
  window.backgroundImages.push(bg_2);
  window.backgroundImages.push(bg_3);
  window.backgroundImages.push(bg_4);


  const img = new Image();
  img.src = assetPath + "image.jpg"; //"./src/assets/image.jpg";


  window.images = [];
  window.images.push(img);
 
  window.patterns = [];

  const pattern = new Image();
  pattern.src = assetPath + "pattern_2.jpg";
  window.patterns.push(pattern);

  const patternWall = new Image();
  patternWall.src = assetPath + "pattern_5.jpg";
  window.patterns.push(patternWall);


  window.game = new Game(canvasEl);
})