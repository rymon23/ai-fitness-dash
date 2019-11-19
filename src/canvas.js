import Box from "./box";
import * as Util from "./util";

const DEFAULT_COLOR = "#000000";//"rgb(114, 120, 133)";

class Canvas {
  constructor(game, canvasEl) {
    this.game = game;
    this.canvasEl = canvasEl;
    this.width = this.canvasEl.width;
    this.height = this.canvasEl.height;

    this.assetPath = window.assetPath;
    this.backgroundImages = window.backgroundImages;

    const h = this.height;
    const w = this.width;
    const wallThickness = 10;
    const wallStyle = { fillStyle: DEFAULT_COLOR, strokeStyle: "#000000" };

    const top = new Box(game, 0, 0, wallThickness, w, wallStyle);
    const down = new Box(game, 0, h - wallThickness, wallThickness, w, wallStyle);
    const left = new Box(game, 0, 0, w, wallThickness, wallStyle);
    const right = new Box(game, w - wallThickness, 0, w, wallThickness, wallStyle);

    //Testing
    top.tags = ["canvasWall","canvasTop"];
    down.tags = ["canvasWall", "canvasBottom"];
    left.tags = ["canvasWall", "canvasLeft"];
    right.tags = ["canvasWall", "canvasRight"];

    top.trigger = "seeUp";
    down.trigger = "seeDown";
    left.trigger = "seeCanvasWall";
    right.trigger = "seeCanvasWall";

    this.borders = {
      top,
      down,
      right,
      left
    };

    this.PosX = this.PosX.bind(this);
    this.PosY = this.PosY.bind(this);
    this.RenderBorders = this.RenderBorders.bind(this);
    this.RefreshBackground = this.RefreshBackground.bind(this);
    this.Update = this.Update.bind(this);
    this.UpdateSize = this.UpdateSize.bind(this);

    this.UpdateSize();
  }

  Init(){
    //this.UpdateSize();

    this.borders.top.Init();
    this.borders.down.Init();
    this.borders.right.Init();
    this.borders.left.Init(); 
    this.RefreshBackground();

    //LISTEN FOR MOUSE OVER
    // this.canvasEl.addEventListener("mousemove", e => {
    this.canvasEl.addEventListener("click", e => {
      const rect = this.canvasEl.getBoundingClientRect();
      window.mousePosX = e.clientX - rect.left;
      window.mousePosY = e.clientY - rect.top;
      // alert(`canvasX: ${window.mousePosX} canvasY: ${window.mousePosY} \n mouseX: ${e.clientX} mouseY: ${e.clientY} \n  rectL: ${rect.left} rectT: ${rect.top}`);
    }); 
  }

  PosX() {
    return this.x;
  }

  PosY() {
    return this.y;
  }

  RefreshBackground(){
    if (this.backgroundImages.length > 1){
      const currentBg = this.canvasEl.style.backgroundImage;
      let newBg = `url(${Util.sampleArray(this.backgroundImages).src})`
      while (currentBg === newBg){
        newBg = Util.sampleArray(this.backgroundImages)
      }
    }
    const newBg = Util.sampleArray(this.backgroundImages)
    this.canvasEl.style.backgroundImage = `url(${newBg.src})`;
  }

  RenderBorders(ctx) {
    Object.values(this.borders).forEach(wall => {
          if (wall) wall.Render(ctx);
        });
  }
  Update(){
    this.UpdateSize();
  }
  UpdateSize(){
    debugger
    // const minHeight = 480;
    // const minWidth = 640;
    // const maxHeight = 720;
    // const maxWidth = 1280;

    // const rect = this.canvasEl.parentNode.getBoundingClientRect();
    const parent = this.canvasEl.parentElement;
    // const heightDiff = rect.height - this.canvasEl.height;
    // const widthDiff = rect.width - this.canvasEl.width;
    const heightDiff = parent.clientHeight - this.canvasEl.height;
    const widthDiff = parent.clientWidth - this.canvasEl.width;

    // if (heightDiff !== 0) {
    //   const newHeight = this.canvasEl.height + heightDiff;
    //   if (newHeight <= maxHeight && newHeight >= minHeight){
    //     this.canvasEl.height = parent.height;
    //   }
    // }
    // if (widthDiff !== 0) {
    //   const newWidth = this.canvasEl.height + widthDiff;
    //   if (newWidth <= maxWidth && newWidth >= minWidth){
    //     this.canvasEl.width = parent.width;
    //   }
    // }
    this.canvasEl.width = parent.clientWidth;
    this.canvasEl.height = parent.clientHeight;
  }
}
export default Canvas;
