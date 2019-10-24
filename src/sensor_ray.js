import * as Util from "./util";
import Vector2 from "./vector2";
import Form from "./form";

// const SENSOR_RANGE = 20;
// const SENSOR_Width = 2;

class SensorRay extends Form{
  constructor(ownerObject, direction, length, thickness) {
    super();
    this.owner = ownerObject;
    this.length = length;
    this.thickness = thickness;

    this.hit = false;
    this.direction = direction;
    this.isNegativeDir = this.direction === "up" || this.direction === "left";
    this.tags = ["sensorRay"];

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
      return this.direction === "right"
        ? this.owner.PosX() + offset
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

  //TEMP
  DirX() {
    return 0;
  }
  DirY() {
    return 0;
  }
  //
  HasTag(tag) {
    return this.tags.includes(tag);
  }
  HasXDirection() {
    return this.direction === "right" || this.direction === "left";
  }
  HasYDirection() {
    return this.direction === "up" || this.direction === "down";
  }
  GetHeight() {
    return this.HasYDirection() ? this.length : this.thickness;
  }
  GetWidth() {
    return this.HasXDirection() ? this.length : this.thickness;
  }
  GetRange() {
    return this.length;
  }

  GetCenterPos() {
    return new Vector2(
      this.PosX() + this.GetWidth() / 2,
      this.PosY() + this.GetHeight() / 2
    );
  }

  Render(ctx) {
    ctx.beginPath();

    ctx.rect(
      this.PosX(),
      this.PosY(),
      this.isNegativeDir ? -this.GetWidth() : this.GetWidth(),
      this.isNegativeDir ? -this.GetHeight() : this.GetHeight()
    );

    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
  }

  SensorTriggered(object) {
    // debugger;
    this.owner.SetSensorHit(object.trigger, this.direction);
    console.log(
      `Sensor Hit: ${this.direction} Trigger: ${object.trigger} Object: ${object.tags}`
    );
  }

  CheckCollision(object) {
    // debugger;
    switch (this.direction) {
      case "up":
        this.hit = Util.isCollidingOnY(this, object);
        break;
      case "down":
        this.hit = Util.isCollidingOnY(this, object);
        break;
      case "right":
        this.hit = Util.isCollidingOnX(this, object);
        break;
      case "left":
        this.hit = Util.isCollidingOnX(this, object);
        break;
      default:
        this.hit = false;
        break;
    }
    if (this.hit) {
      this.hit = false;
      this.SensorTriggered(object);
      return true;
    } else {
      return false;
    }
  }

  hasOverlapTop(objectA, objectB) {
    if (!Util.isAInXOfB(objectA, objectB)) return false;

    return (
      objectA.PosY() <= objectB.PosY() + objectB.GetHeight() &&
      objectA.PosY() + objectA.GetHeight() > objectB.PosY()
    );
  }
  hasOverlapBottom(objectA, objectB) {
    if (!Util.isAInXOfB(objectA, objectB)) return false;

    return (
      objectA.PosY() + objectA.GetHeight() >= objectB.PosY() &&
      objectA.PosY() < objectB.PosY() + objectB.GetHeight()
    );
  }
  hasOverlapRight(objectA, objectB) {
    if (!Util.isAInYOfB(objectA, objectB)) return false;

    return (
      objectA.PosX() + objectA.GetWidth() >= objectB.PosX() &&
      objectA.PosX() < objectB.PosX() + objectB.GetWidth()
    );
  }
  hasOverlapLeft(objectA, objectB) {
    if (!Util.isAInYOfB(objectA, objectB)) return false;

    return (
      objectA.PosX() <= objectB.PosX() + objectB.GetWidth() &&
      objectA.PosX() + objectA.GetWidth() > objectB.PosX()
    );
  }
}

export const CreateSensorRays = (owner ,sensorRange, sensorThickness) => {
  const up = new SensorRay(owner, "up", sensorRange, sensorThickness);
  const down = new SensorRay(owner, "down", sensorRange, sensorThickness);
  const right = new SensorRay(owner, "right", sensorRange, sensorThickness);
  const left = new SensorRay(owner, "left", sensorRange, sensorThickness);
  const sensorRays = {
    up,
    down,
    right,
    left
  };
  return sensorRays;
};

export default SensorRay;