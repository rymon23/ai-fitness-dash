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

  // const sliderPop = document.getElementById("slider-pop");
  // const sliderDur = document.getElementById("slider-duration");
  // const sliderTopPerc = document.getElementById("slider-top-perc");
  // const sliderMutation = document.getElementById("slider-mutation");

  // sliderPop.addEventListener("click", ()=> {
  //   sliderPop.addEventListener(
  //     "input", updateElementValue("slider-pop-value", sliderPop.value)
  //   );
  // });
  // sliderDur.addEventListener("click", ()=> {
  //   sliderDur.addEventListener(
  //     "input", updateElementValue("slider-duration-value", sliderDur.value)
  //   );
  // });
  // sliderTopPerc.addEventListener("click", ()=> {
  //   sliderTopPerc.addEventListener(
  //     "input", updateElementValue("slider-top-perc-value", `${sliderTopPerc.value}%`)
  //   );
  // });
  // sliderMutation.addEventListener("click", ()=> {
  //   sliderMutation.addEventListener(
  //     "input", updateElementValue("slider-mutation-value", `${sliderMutation.value}%`)
  //   );
  // });

  const assetPath = "./src/assets/";

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