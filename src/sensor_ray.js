import * as Util from "./util";
import Vector2 from "./vector2";

// export const DIRECTIONS = {
//   up,
//   down,
//   left,
//   right
// }
const SENSOR_RANGE = 28;
const SENSOR_Width = 2;

class SensorRay {
  constructor(ownerObject, direction, length, thickness) {
    this.owner = ownerObject;
    this.length = length;
    this.thickness = thickness;

    this.hit = false;
    this.direction = direction;
    this.isNegativeDir = (this.direction === "up" || this.direction === "left");

    this.PosX = this.PosX.bind(this);
    this.PosY = this.PosY.bind(this);
    this.GetHeight = this.GetHeight.bind(this);
    this.GetWidth = this.GetWidth.bind(this);
    this.HasXDirection = this.HasXDirection.bind(this);
    this.HasYDirection = this.HasYDirection.bind(this);
    this.GetCenterPos = this.GetCenterPos.bind(this);
    this.SensorTriggered = this.SensorTriggered.bind(this);
    this.CheckCollision = this.CheckCollision.bind(this);
    this.Render = this.Render.bind(this);
  }

  PosX() {
    if (this.HasXDirection()) {
      let offset = this.owner.GetWidth() / 2.0;
      return this.direction === "right" ?
          this.owner.PosX() + offset
          : this.owner.PosX() - offset;

    } else if (this.HasYDirection()) {
      return this.owner.PosX();
    } 
    return null;
  }

  PosY() {
    if (this.HasYDirection()) {
      let offset = this.owner.GetHeight() / 2.0;
      return this.direction === "down"
        ? this.owner.PosY() + offset
        : this.owner.PosY() - offset;
    } else if (this.HasXDirection()) {
      return this.owner.PosY();
    }
    return null;
  }

  HasXDirection(){
    return this.direction === "right" || this.direction === "left";
  }  
  HasYDirection(){
    return (this.direction === "up" || this.direction === "down");
  }
  GetHeight() {
    return this.HasYDirection() ? this.length : this.thickness;
  }
  GetWidth() {
    return this.HasXDirection() ? this.length : this.thickness;
  }
  GetCenterPos() {
    return new Vector2(
      this.PosX() + this.GetWidth() / 2,
      this.PosY() + this.GetHeight() / 2
    );
  }

  Render(ctx){
    ctx.beginPath();

    ctx.rect(this.PosX(), this.PosY(),
      this.isNegativeDir ? -this.GetWidth() : this.GetWidth()
      , this.isNegativeDir ? -this.GetHeight() : this.GetHeight());

    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
  }

  SensorTriggered(object){
    this.owner.SetSensorHit(object.trigger);
    console.log(`Sensor Hit: ${this.direction} Trigger: ${object.trigger}`);
  }

  CheckCollision(object) {
    switch (this.direction) {
      case "up":
        this.hit = Util.hasOverlapTop(this, object);
        break;
      case "down":
        this.hit = Util.hasOverlapBottom(this, object);
        break;
      case "right":
        this.hit = Util.hasOverlapRight(this, object);
        break;
      case "left":
        this.hit = Util.hasOverlapLeft(this, object);
        break;
      default:
        this.hit = false;
        break;
    }
    this.hit ? this.SensorTriggered(object) : null;
    this.hit = false;
    return !this.hit;
  }
}

export const CreateSensorRays = (owner) => {
  const up = new SensorRay(owner, "up", SENSOR_RANGE, SENSOR_Width);
  const down = new SensorRay(owner, "down", SENSOR_RANGE, SENSOR_Width);
  const right = new SensorRay(owner, "right", SENSOR_RANGE, SENSOR_Width);
  const left = new SensorRay(owner, "left", SENSOR_RANGE, SENSOR_Width);
  const sensorRays = {
    up,
    down,
    right,
    left
  };
  return sensorRays;
};

export default SensorRay;