import * as Util from "./util";
import GameObject from "./gameobject";

class Box extends GameObject {
  constructor(game, x, y, height, width, borderColor = "rgba(0, 0, 255, 0.5)") {
    super();
    this.game = game;
    this.pos = { x, y };
    this.height = height;
    this.width = width;
    this.borderColor = borderColor;

  }

  Render(ctx){
    ctx.beginPath();
    ctx.rect(this.PosX(), this.PosY(), this.GetWidth(), this.GetHeight());
    ctx.strokeStyle = this.borderColor;
    ctx.stroke();
    ctx.closePath();
  }
}

export default Box;