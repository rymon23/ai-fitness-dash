import * as Util from "./util";
import GameObject from "./gameobject";

const DEFAULT_COLOR = "rgba(0, 0, 255, 0.5)";

class Box extends GameObject {
  constructor(game, x, y, height, width, styles = { fillStyle: DEFAULT_COLOR, strokeStyle: DEFAULT_COLOR }) {
    super();
    this.game = game;
    this.pos = { x, y };
    this.height = height;
    this.width = width;    
    this.styles = styles;
    this.objectType = "box";
  }

  Update(){
    this.CheckForCollisions();
  }

  Render(ctx){
    ctx.beginPath();
    ctx.rect(this.PosX(), this.PosY(), this.GetWidth(), this.GetHeight());
    
    if (this.styles.fillStyle){
      ctx.fillStyle = this.styles.fillStyle;
      ctx.fill();
    }
    if (this.styles.strokeStyle){
      ctx.strokeStyle = this.styles.strokeStyle;
      ctx.stroke();
    }
    ctx.closePath();
  }
}
export default Box;