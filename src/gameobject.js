import * as Util from "./util";
import Vector2 from "./vector2";

const DEFAULT_COLOR = "#000000";

class GameObject {
  constructor(game, x = 0, y = 0, styles = { fillStyle: DEFAULT_COLOR, strokeStyle: null }) {
    this.game = game;
    this.pos = { x, y };
    this.height = 1;
    this.width = 1;
    this.center;
    this.styles = styles;
    this.obstructed = {};

    this.isStatic = true;
    this.hasSensors = false;
    this.target = null;
    this.interval;
    this.trigger = "";
    this.tags = ["gameObject"];

    this.Init = this.Init.bind(this);
    this.FixedUpdate = this.FixedUpdate.bind(this);
    this.Update = this.Update.bind(this);
    this.Render = this.Render.bind(this);
    this.StopUpdate = this.StopUpdate.bind(this);
    this.HasTag = this.HasTag.bind(this);
    this.Destroy = this.Destroy.bind(this);

    this.SetPosX = this.SetPosX.bind(this);
    this.SetPosY = this.SetPosY.bind(this);
    this.PosX = this.PosX.bind(this);
    this.PosY = this.PosY.bind(this);
    this.DirX = this.DirX.bind(this);
    this.DirY = this.DirY.bind(this);
    this.GetHeight = this.GetHeight.bind(this);
    this.GetWidth = this.GetWidth.bind(this);
    this.GetCenterPos = this.GetCenterPos.bind(this);
    this.GetDistance = this.GetDistance.bind(this);
    this.SetTarget = this.SetTarget.bind(this);
    this.CheckForCollisions = this.CheckForCollisions.bind(this);
    this.IsInCollisionZone = this.IsInCollisionZone.bind(this);
  }

  Init() {
    // this.interval = setInterval(this.Update, 10);
    this.FixedUpdate();
  }

  FixedUpdate(ms = 10){
    this.interval = setTimeout(() => {
      this.Update();
      this.FixedUpdate(ms);}
      , ms);
  }

  Update() {
    //OVERRIDE BY CHILD
  }

  StopUpdate() {
    clearInterval(this.interval);
  }

  Destroy() {
    this.StopUpdate();
    delete this;
  }

  Render(ctx) {
    //OVERRIDE BY CHILD
  }

  SetPosX(posX) {
    this.pos.x = posX;
  }

  SetPosY(posY) {
    this.pos.x = posY;
  }

  DirX() {
    return this.dx;
  }
  DirY() {
    return this.dy;
  }

  GetCenterPos() {
    return new Vector2(
      this.PosX() + this.GetWidth() / 2,
      this.PosY() + this.GetHeight() / 2      
    )
  }

  PosX() {
    return this.pos.x;
  }
  PosY() {
    return this.pos.y;
  }
  GetWidth() {
    return this.width;
  }
  GetHeight() {
    return this.height;
  }
  GetDistance(target) {
    Util.getDistance(this.GetCenterPos(), target.GetCenterPos());
  }

  HasTag(tag){
    return this.tags.includes(tag);
  }

  SetTarget(object) {
    if (object && this !== object) {
      this.target = object;
    }
  }

  IsInCollisionZone(object) {
    if (!object) return false;

    if (object.hasSensors) {
      object.SensorCheck(this);
    }

    const colX = Util.isCollidingOnX(object, this);
    // debugger
    if (colX){
      console.log(`${this.tags}: COLLISION DETECTED: X - ${object.tags} DirX: ${object.DirX()}`);
      object.obstructed.left 
        = object.DirX() < 0 ? true : object.obstructed.left;
      object.obstructed.right
        = object.DirX() >= 0 ? true : object.obstructed.right;

      if (object.HasTag("ball")) {
        object.dx = -object.dx;
      } else {
        object.dx = 0;
      }
      return true;
    }

    const colY = Util.isCollidingOnY(object, this);
    // debugger
    if (colY){
      console.log(`${this.tags}: COLLISION DETECTED: Y - ${object.tags} DirY: ${object.DirY()}`);
      object.obstructed.up =
        object.DirY() < 0 ? true : object.obstructed.up;
      object.obstructed.down =
        object.DirY() >= 0 ? true : object.obstructed.down;

      if (object.HasTag("ball")) {
        object.dy = -object.dy;
      } else {
        object.dy = 0;
      }
      return true;
    }

    // if (
    //   object.PosX() > this.PosX() - object.GetWidth() &&
    //   object.PosX() - object.GetWidth() < this.PosX() + this.GetWidth() &&
    //   object.PosY() > this.PosY() &&
    //   object.PosY() < this.PosY() + this.GetHeight()
    // ) {
    //   // console.log("COLLISION DETECTED: X");
    //   callBack(object);
    //   return true;
    // }
    // if (
    //   object.PosX() > this.PosX() &&
    //   object.PosX() < this.PosX() + this.GetWidth() &&
    //   (object.PosY() > this.PosY() - object.GetHeight() &&
    //     object.PosY() - object.GetHeight() < this.PosY() + this.GetHeight())
    // ) {
    //   // console.log("COLLISION DETECTED Y");
    //   // object.dy = 0;  //-object.dy;

    //   return true;
    // }
    
  }

  CheckForCollisions() {
    Object.values(this.game.gameObjects).forEach(array => {
      if (array.length > 0) {
        array.forEach(gameObject => {
          if (gameObject && gameObject != this && !gameObject.isStatic) {
            this.IsInCollisionZone(gameObject);
          }
        });
      }
    });
  }

}

export default GameObject;