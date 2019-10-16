import * as Util from "./util";
import GameObject from "./gameobject";

const COLUMN_WIDTH = 20;
const COLUMN_COLOR = "#FFFFF";

class Column extends GameObject {
  constructor(game, x, y, height, width, triggers = {}) {
    super();
    this.game = game;
    this.pos = { x, y };
    this.height = height;
    this.width = width;
    this.triggers = triggers;
    this.color = COLUMN_COLOR;

    this.Init();
  }

  Render(ctx) {
    ctx.beginPath();
    ctx.rect(this.PosX(), this.PosY(), this.GetWidth(), this.GetHeight());
    ctx.fillStyle = "#FFFFF";
    ctx.fill();
    ctx.closePath();
  }

  Update(){
    this.CheckForCollisions();
  }
}

export const CreateColumns = (startPosX = 125, game) => {
    const columns = [];

    const randomColumnBuffer = () => {
      return Util.getRandomInt(40, 80);
    };

    const randomColumnStartPosY = column => {
      if (Math.random() >= 0.5) {
        column.pos.y = 0;
        // column.triggers = SENSOR_TRIGGERS[0];
      } else {
        column.pos.y = game.canvas.height - column.height;
        // column.triggers = SENSOR_TRIGGERS[1];
      }
    };

    let currentPosX = startPosX;
    let ix = 0;
    while (currentPosX < game.canvas.width * 0.85) {
      let height = Util.getRandomInt(50, game.canvas.height * 0.8);
      columns[ix] = new Column(game,currentPosX, 0, height, COLUMN_WIDTH);
      randomColumnStartPosY(columns[ix]);

      ix += 1;
      currentPosX += COLUMN_WIDTH + randomColumnBuffer();
    }
  return columns;
}

export default Column;