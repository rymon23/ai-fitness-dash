import * as Util from "./util";
import GameObject from "./gameobject";

class Ball extends GameObject {
  constructor(game, x, y, radius = 10, color = "#0095DD") {
    super();
    this.game = game;
    this.isStatic = false;
    this.pos = { x, y };
    this.dx = 2;
    this.dy = 2;
    this.radius = radius;
    this.height = radius;
    this.width = radius;
    this.color = color;
    this.objectType = "ball";

    this.Init();
  }

  GetWidth() {
    return this.radius;
  }
  GetHeight() {
    return this.radius;
  }

  Update() {
    // debugger
    this.pos.x += this.DirX();
    this.pos.y += this.DirY();
  }

  Render(ctx) {
    ctx.beginPath();
    ctx.arc(this.PosX(), this.PosY(), this.GetWidth(), 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

}

export default Ball;
