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
  }

  Init(){
    this.borders.top.Init();
    this.borders.down.Init();
    this.borders.right.Init();
    this.borders.left.Init(); 

    this.RefreshBackground();
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
}
export default Canvas;