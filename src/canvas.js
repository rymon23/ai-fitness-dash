import Box from "./box";

const DEFAULT_COLOR = "#000000";

class Canvas {
  constructor(game, canvasEl) {
    this.game = game;
    this.canvasEl = canvasEl;
    this.width = this.canvasEl.width;
    this.height = this.canvasEl.height;
    const h = this.height;
    const w = this.width;
    const wallThickness = 10;
    const wallStyle = { fillStyle: DEFAULT_COLOR, strokeStyle: null };

    const top = new Box(game, 0, 0, wallThickness, w, wallStyle);
    const down = new Box(game, 0, h - wallThickness, wallThickness, w, wallStyle);
    const left = new Box(game, 0, 0, w, wallThickness, wallStyle);
    const right = new Box(game, w - wallThickness, 0, w, wallThickness, wallStyle);

    //Testing
    top.objectType = "canvasTop"
    down.objectType = "canvasBottom";
    left.objectType = "canvasLeft";
    right.objectType = "canvasRight";

    top.trigger = "seeTop";
    down.trigger = "seeBottom";
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
  }

  Init(){
    this.borders.top.Init();
    this.borders.down.Init();
    this.borders.right.Init();
    this.borders.left.Init();  
  }

  PosX() {
    return this.x;
  }

  PosY() {
    return this.y;
  }

  RenderBorders(ctx) {
    Object.values(this.borders).forEach(wall => {
          if (wall) wall.Render(ctx);
        });
  }
}
export default Canvas;
