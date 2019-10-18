import GameObject from "./gameobject";
import * as Util from "./util";


class Ball extends GameObject {
  constructor(startPos, radius = 10, color = "#0095DD") {
    super();
    this.pos = { 
        x: startPos.PosX(),
        y: startPos.PosY() 
      };
    this.isStatic = false;
    this.speed = Util.getRandomInt(2,4);
    this.dx = 1;
    this.dy = 1;
    this.radius = radius;
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
    this.pos.x += this.DirX()*this.speed;
    this.pos.y += this.DirY()*this.speed;
  }

  Render(ctx) {
    ctx.beginPath();
    ctx.arc(this.PosX(), this.PosY(), this.GetWidth(), 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

}

export const CreateBalls = (amount, atObject) => {
  const balls = [];
  for (let i = 0; i < amount; i++) {
    balls[i] = new Ball(atObject)
  }
  return balls;
}

export default Ball;
