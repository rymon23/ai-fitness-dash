import * as Util from "./util";
import GameObject from "./gameobject";

const COLUMN_WIDTH = 20;
const COLUMN_COLOR = "#FFFFF";

const DEFAULT_FILL = "#000000"; //"#FFFFF";
const DEFAULT_STROKE = "#000000";

class Column extends GameObject {
  constructor(game, x, y, height, width, triggers = {}) {
    super();
    this.game = game;
    this.pos = { x, y };
    this.height = height;
    this.width = width;
    this.triggers = triggers;
    this.styles = { fillStyle: DEFAULT_FILL, strokeStyle: DEFAULT_STROKE };
    this.trigger = "";
    this.tags = ["column"];
    this.shape = "box";

    this.Init();
  }

  Render(ctx) {
    ctx.beginPath();
    ctx.rect(this.PosX(), this.PosY(), this.GetWidth(), this.GetHeight());
    if (this.styles.fillStyle) {
      // ctx.fillStyle = this.styles.fillStyle;

      const pattern = ctx.createPattern(window.wallPatterns[0], "repeat");
      ctx.fillStyle = pattern; //this.color;
      ctx.fill();
    }
    if (this.styles.strokeStyle) {
      ctx.strokeStyle = this.styles.strokeStyle;
      ctx.stroke();
    }
    ctx.closePath();
    // this.RenderPos(ctx);
  }

  Update(){
    this.CheckForCollisions();
  }
}

export const CreateColumns = (startPosX = 125, game) => {
    const columns = [];

    const randomColumnBuffer = () => {
      return Util.getRandomInt(60, 80);
    };

    const randomColumnStartPosY = (column) => {
      if (Math.random() >= 0.5) {
        column.pos.y = 0;
        column.trigger = "seeDownWall";

      } else {
        column.pos.y = game.canvas.height - column.height;
        column.trigger = "seeUpWall";
      }
    };

    let currentPosX = startPosX;
    let ix = 0;
    while (currentPosX < game.canvas.width * 0.85) {
      let height = Util.getRandomInt(game.canvas.height * 0.35, game.canvas.height * 0.86);
      columns[ix] = new Column(game,currentPosX, 0, height, COLUMN_WIDTH);
      randomColumnStartPosY(columns[ix]);

      ix += 1;
      currentPosX += COLUMN_WIDTH + randomColumnBuffer();
    }
  return columns;
}

export default Column;