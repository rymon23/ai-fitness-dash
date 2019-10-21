import _ from 'lodash';
import Game from './game';

// const component = () => {
//   const element = document.createElement("div");

//   element.innerHTML = _.join(["Hello", "webpack"], " ");

//   return element;
// }
// document.body.appendChild(component());

const canvasEl = document.getElementsByTagName("canvas")[0];
// canvasEl.height = window.innerHeight;
// canvasEl.width = window.innerWidth;
// new Game(canvasEl.width, canvasEl.height).start(canvasEl);
export const game = new Game(canvasEl);
window.game = game;

export const timer = (seconds, callback) => {
  const remaningTime = seconds;
  window.setTimeout(function() {
    // callback();
    // console.log(remaningTime);

    const formatRemainingTime = (seconds) => {
      // const minutes = Math.floor(remaningTime / 60);
      let ms = `Time Remaining: `;
      // if (minutes > 0){
      //   return ms + `${minutes}:${seconds}`;
      // }else {
        // return ms + (seconds < 10 ? `00:0${seconds}` : `00:${seconds}`);
        return ms + (seconds < 10 ? `0${seconds}` : `${seconds}`);
      // }
    }
    if (remaningTime > 0) {
      document.getElementById("timer").innerHTML = formatRemainingTime(remaningTime);
      timer(remaningTime - 1, callback);
    } else {
      document.getElementById("timer").innerHTML = "Time Up!";
    }
  }, 1000);
}

// timer(10);