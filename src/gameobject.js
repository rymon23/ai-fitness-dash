import * as Util from "./util";
import Form from "./form";
import Vector2 from "./vector2";

const DEFAULT_COLOR = "#000000";
const POS_COLOR = "#f7b527";
const Highlight_COLOR = "#fdff92";

class GameObject extends Form {
  constructor(
    game,
    x = 0,
    y = 0,
    styles = { fillStyle: DEFAULT_COLOR, strokeStyle: null }
  ) {
    super();
    this.game = game;
    this.pos = { x, y };
    this.height = 1;
    this.width = 1;
    this.center;
    this.styles = styles;
    this.obstructed = {};
    this.shape = null;
    this.isStatic = true;
    this.hasSensors = false;
    this.target = null;
    this.interval;
    this.trigger = "";
    this.tags = ["gameObject"];

    if (!this.isStatic) {
      this.crashes = 0;
      this.collision = {};
    }

    this.Init = this.Init.bind(this);
    this.FixedUpdate = this.FixedUpdate.bind(this);
    this.Update = this.Update.bind(this);
    this.Render = this.Render.bind(this);
    this.StopUpdate = this.StopUpdate.bind(this);
    this.Destroy = this.Destroy.bind(this);
    this.SetPosX = this.SetPosX.bind(this);
    this.SetPosY = this.SetPosY.bind(this);
    this.PosX = this.PosX.bind(this);
    this.PosY = this.PosY.bind(this);
    this.DirX = this.DirX.bind(this);
    this.DirY = this.DirY.bind(this);
    this.GetHeight = this.GetHeight.bind(this);
    this.GetWidth = this.GetWidth.bind(this);
    this.GetDistance = this.GetDistance.bind(this);
    this.SetTarget = this.SetTarget.bind(this);
    this.CheckForCollisions = this.CheckForCollisions.bind(this);
    this.CheckCollisionOnObject = this.CheckCollisionOnObject.bind(this);
    this.CollisionUpdate = this.CollisionUpdate.bind(this);
  }

  Init() {
    this.updating = false;
    this.updateID = requestAnimationFrame(this.FixedUpdate);
  }

  FixedUpdate() {
    if (!this.updating && window.game.running ) {
      this.updating = true;
      this.updating = this.Update();
    }
    this.updateID = requestAnimationFrame(this.FixedUpdate);

    // this.interval = setTimeout(() => {
    //   if (this.HasTag("entity")){
    //     // debugger
    //   }
    //   if (!this.updating){
    //     this.updating = true;
    //     this.updating = this.Update();
    //   }
    //   this.FixedUpdate(ms);}
    //   , ms);
  }

  Update() {
    //OVERRIDE BY CHILD
    return false;
  }

  StopUpdate() {
    // clearInterval(this.interval);
    cancelAnimationFrame(this.updateID);
  }

  Render(ctx) {
    //OVERRIDE BY CHILD

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

  SetPosX(posX) {
    this.pos.x = posX;
  }

  SetPosY(posY) {
    this.pos.y = posY;
  }

  DirX() {
    return this.dx;
  }
  DirY() {
    return this.dy;
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
  GetCenterPos() {
    return new Vector2(
      this.PosX() + this.GetWidth() / 2,
      this.PosY() + this.GetHeight() / 2
    );
  }
  GetDistance(target) {
    Util.getDistance(this.GetCenterPos(), target.GetCenterPos());
  }

  SetTarget(object) {
    if (object && this !== object) {
      this.target = object;
    }
  }

  CollisionUpdate() {
    this.crashes++;
  }

  CheckCollisionOnObject(object) {
    if (!object) return false;

    if (object.hasSensors) {
      object.SensorCheck(this);
    }

    const colX = Util.isCollidingOnX(object, this);

    if (colX) {
      console.log(
        `${this.tags}: COLLISION DETECTED: X - ${
          object.tags
        } DirX: ${object.DirX()}`
      );

      const side = Util.getObjectASideBOnX(object, this);
      if (side < 0) {
        //object on left side
        object.obstructed.right = true;
      } else {
        object.obstructed.left = true;
      }

      object.HasTag("entity") ? object.SetCollisionHit(this.trigger) : null;

      if (object.HasTag("ball")) {
        object.dx = -object.dx;
      } else {
        object.dx = 0;
      }

      object.CollisionUpdate();
    }

    const colY = Util.isCollidingOnY(object, this);
    if (colY) {
      console.log(
        `${this.tags}: COLLISION DETECTED: Y - ${
          object.tags
        } DirY: ${object.DirY()}`
      );

      // debugger
      const side = Util.getObjectASideBOnY(object, this);
      if (side < 0) {
        //object below
        object.obstructed.up = true;
      } else {
        object.obstructed.down = true;
      }

      object.HasTag("entity") ? object.SetCollisionHit(this.trigger) : null;

      if (object.HasTag("ball")) {
        object.dy = -object.dy;
      } else {
        object.dy = 0;
      }
      object.CollisionUpdate();
    }
  }

  CheckForCollisions() {
    Object.values(this.game.gameObjects).forEach(array => {
      if (array.length > 0) {
        array.forEach(gameObject => {
          if (gameObject && gameObject != this && !gameObject.isStatic) {
            this.CheckCollisionOnObject(gameObject);
          }
        });
      }
    });
  }

  Highlight() {
    this.styles.fillStyle = Highlight_COLOR;
  }
}

export default GameObject;