import * as Util from "./util";
import Vector2 from "./vector2";


class GameObject {
  constructor(game, x = 0, y = 0, color = "#000000") {
    this.game = game;
    this.pos = { x, y };
    this.height = 1;
    this.width = 1;
    this.center;
    this.color = color;
    this.borderColor = "";
    this.isStatic = true;
    this.hasSensors = false;
    this.target = null;
    this.interval;
    this.trigger = "";

    // this.triggers = {
    //   seeDownWall: false,
    //   seeUpWall: false,
    //   seeBottom: false,
    //   seeTop: false
    // };

    this.Init = this.Init.bind(this);
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
    this.GetCenterPos = this.GetCenterPos.bind(this);
    this.GetDistance = this.GetDistance.bind(this);
    this.SetTarget = this.SetTarget.bind(this);
    this.CheckForCollisions = this.CheckForCollisions.bind(this);
    this.IsInCollisionZone = this.IsInCollisionZone.bind(this);
  }

  Init() {
    this.interval = setInterval(this.Update, 10);
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
    const v2 = new Vector2(
      this.PosX() + this.GetWidth() / 2,
      this.PosY() + this.GetHeight() / 2      
    )
    debugger
    return v2;
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

  SetTarget(object) {
    if (object && this !== object) {
      this.target = object;
    }
  }

  IsInCollisionZone(
    object,
    callBack = object => {
      object.dx = 0;
    }
  ) {
    if (!object) return false;

    const sensorOnX = (x, sensorType = "") => {
      if (
        x > this.PosX() &&
        x < this.PosX() + this.GetWidth() &&
        object.PosY() > this.PosY() &&
        object.PosY() < this.PosY() + this.GetHeight()
      ) {
        object.SetSensorHit(this.trigger);
        console.log(`Sensor X Hit: ${sensorType}`);
        // debugger
        return true;
      } else {
        return false;
      }
    };
    const sensorOnY = (y, sensorType = "") => {
      if (
        object.PosX() > this.PosX() &&
        object.PosX() < this.PosX() + this.GetWidth() &&
        (y > this.PosY() && y < this.PosY() + this.GetHeight())
      ) {
        if (sensorType === "TOP") {
          object.SetSensorHit("seeTop");
        } else {
          object.SetSensorHit("seeBottom");
        }
        console.log(`Sensor Y Hit: ${sensorType}`);
        // debugger
        return true;
      } else {
        return false;
      }
    };

    if (object.hasSensors) {
      if (sensorOnX(object.SensorX(true), "RIGHT")) {
        // // object.triggerType = this.triggerType;
      } else if (sensorOnX(object.SensorX(false), "LEFT")) {
        // // object.triggerType = this.triggerType;
      } else if (sensorOnY(object.SensorY(true), "BOTTOM")) {
        // // object.triggerType = this.triggerType;
      } else if (sensorOnY(object.SensorY(false), "TOP")) {
        // // object.triggerType = this.triggerType;
      }
    }

    // const isInRangeX = Util.isInRange(
    //   objectX,
    //   this.pos.x,
    //   this.pos.x + this.width
    // );
    // const isInRangeY = Util.isInRange(
    //   objectY,
    //   this.pos.y,
    //   this.pos.y + this.height
    // );

    if (
      object.PosX() > this.PosX() - object.GetWidth() &&
      object.PosX() - object.GetWidth() < this.PosX() + this.GetWidth() &&
      object.PosY() > this.PosY() &&
      object.PosY() < this.PosY() + this.GetHeight()
    ) {
      // console.log("COLLISION DETECTED: X");
      callBack(object);

      return true;
    }
    if (
      object.PosX() > this.PosX() &&
      object.PosX() < this.PosX() + this.GetWidth() &&
      (object.PosY() > this.PosY() - object.GetHeight() &&
        object.PosY() - object.GetHeight() < this.PosY() + this.GetHeight())
    ) {
      // console.log("COLLISION DETECTED Y");
      // object.dy = 0;  //-object.dy;

      return true;
    }
  }

  CheckForCollisions(callBack) {
    Object.values(this.game.gameObjects).forEach(array => {
      if (array.length > 0) {
        array.forEach(gameObject => {
          if (gameObject && gameObject != this && !gameObject.isStatic) {
            this.IsInCollisionZone(gameObject, callBack);
          }
        });
      }
    });
  }
}

export default GameObject;