import * as Util from "./util";
import Vector2 from "./vector2";


const Highlight_COLOR = "#fdff92";
const POS_COLOR = "#f7b527";

class Form {
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.width = 1;
    this.height = 1;
    this.styles = { fillStyle: null, strokeStyle: null };
    this.tags = [];
    this.shape = null;

    //BINDS
    this.PosX = this.PosX.bind(this);
    this.PosY = this.PosY.bind(this);
    this.GetHeight = this.GetHeight.bind(this);
    this.GetWidth = this.GetWidth.bind(this);
    this.GetCenterPos = this.GetCenterPos.bind(this);
    this.HasTag = this.HasTag.bind(this);
    this.HasShape = this.HasShape.bind(this);
    this.Highlight = this.Highlight.bind(this);
    this.Render = this.Render.bind(this);
    this.RenderPos = this.RenderPos.bind(this);
    this.Destroy = this.Destroy.bind(this);
    this.StopUpdate = this.StopUpdate.bind(this);
  }

  PosX() {
    return this.pos.x;
  }
  PosY() {
    return this.pos.y;
  }
  GetCenterPos() {
    return new Vector2(
      this.PosX() + this.GetWidth() / 2,
      this.PosY() + this.GetHeight() / 2
    );
  }
  GetWidth() {
    return this.width;
  }
  GetHeight() {
    return this.height;
  }
  HasShape(shape) {
    return this.shape === shape;
  }
  HasTag(tag) {
    return this.tags.includes(tag);
  }
  Highlight() {
    this.styles.fillStyle = Highlight_COLOR;
  }
  Render(ctx) {
    if (!ctx) {
      if (!window.ctx) return;
      ctx = window.ctx;
    }
  }
  RenderPos(ctx) {
    ctx.beginPath();
    ctx.arc(this.PosX(), this.PosY(), 2, 0, Math.PI * 2);
    ctx.fillStyle = POS_COLOR;
    ctx.fill();
    ctx.closePath();
  }
  StopUpdate() {
    //OVERRRIDE BY CHILD
  }
  Destroy() {
    this.StopUpdate();
    delete this;
  }
}

export default Form;