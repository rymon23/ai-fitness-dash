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