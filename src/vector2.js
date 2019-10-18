import * as Util from "./util";

class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.PosX = this.PosX.bind(this);
    this.PosY = this.PosY.bind(this);
  }
  PosX() {
    return this.x;
  }
  PosY() {
    return this.y;
  }
  GetHeight() {
    return 1;
  }
  GetWidth() {
    return 1;
  }
}

export default Vector2;