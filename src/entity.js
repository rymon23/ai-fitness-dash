import * as Util from "./util";
import GameObject from "./gameobject";
import DNA from "./dna";
import Vector2 from "./vector2";
import { CreateSensorRays } from "./sensor_ray";

const ENTITY_GOAL_RADIUS = 35;

class Entity extends GameObject {
  constructor(game, startingPos, target = null, id = null, savedDNA = {}) {
    super();
    this.id = id;
    this.game = game;
    this.pos = { x: startingPos.PosX(), y: startingPos.PosY() };
    this.startPos = new Vector2(this.PosX(), this.PosY());
    this.dna = new DNA(savedDNA);

    this.target = target;
    this.tags = ["entity"];
    this.shape = "circle";

    this.dx = 1;
    this.dy = 1;
    this.isStatic = false;
    this.hasSensors = true;
    this.distanceTraveled = 0;

    this.obstructed = {
      up: false,
      down: false,
      left: false,
      right: false
    };

    this.collision = {
      seeDownWall: false,
      seeUpWall: false,
      seeDown: false,
      seeUp: false,
      seeCanvasWall: false
    };

    this.sensorHit = {
      seeDownWall: false,
      seeUpWall: false,
      seeDown: false,
      seeUp: false,
      seeCanvasWall: false
    };

    this.sensorRays = CreateSensorRays(
      this,
      this.dna.GetGene("sensorRange"),
      this.dna.GetGene("sensorThickness")
    );
    this.radius = this.dna.GetGene("size");
    this.speed = this.dna.GetGene("speed") + Math.random();

    this.color = `rgb(${this.dna.GetGene("colorR")},${this.dna.GetGene(
      "colorG"
    )},${this.dna.GetGene("colorB")})`;

    this.goalReached = false;
    this.alive = true;
    this.timeAlive = 0.0;
    this.crashes = 0;
    this.finishBoxDist = 0;

    this.myEle = this.myEle || this.CreateMyEle();

    this.SensorX = this.SensorX.bind(this);
    this.SensorY = this.SensorY.bind(this);
    this.SetSensorHit = this.SetSensorHit.bind(this);
    this.GetTriggerGene = this.GetTriggerGene.bind(this);
    this.IsObstructed = this.IsObstructed.bind(this);
    this.ResetTriggers = this.ResetTriggers.bind(this);
    this.ResetObstructions = this.ResetObstructions.bind(this);
    this.ResetCollisions = this.ResetCollisions.bind(this);
    this.UpdateDirection = this.UpdateDirection.bind(this);
    this.RenderEye = this.RenderEye.bind(this);
    this.CreateMyEle = this.CreateMyEle.bind(this);
    this.UpdateMyElePos = this.UpdateMyElePos.bind(this);

    this.ResetObstructions();
    this.Init();
  }

  GetWidth() {
    return this.radius * 2;
  }
  GetHeight() {
    return this.radius * 2;
  }
  SensorX(right = true) {
    if (right) return this.PosX() + this.sensorRays.right.GetRange(); //RIGHT
    return this.PosX() - this.sensorRays.left.GetRange(); //LEFT
  }
  SensorY(bottom = true) {
    if (bottom) return this.PosY() + this.sensorRays.bottom.GetRange(); //BOTTOM
    return this.PosY() - this.sensorRays.up.GetRange(); //TOP
  }
  SensorCheck(object) {
    Object.keys(this.sensorRays).forEach(key => {
      this.sensorRays[key].CheckCollision(object);
    });
  }
  SetSensorHit(trigger, direction) {
    if (Object.keys(this.sensorHit).includes(trigger)) {
      this.sensorHit[trigger] = true;
      this.obstructed[direction] = true;
    }
  }
  SetCollisionHit(trigger) {
    if (Object.keys(this.collision).includes(trigger)) {
      this.collision[trigger] = true;
    }
  }

  GetTriggerGene() {
    if (this.sensorHit.seeUpWall || this.collision.seeUpWall) {
      this.TriggerActionY(this.dna.GetGene("seeUpWall"));
    }
    if (this.sensorHit.seeDownWall || this.collision.seeDownWall) {
      this.TriggerActionY(this.dna.GetGene("seeDownWall"));
    }
    if (this.sensorHit.seeUp || this.collision.seeUp) {
      this.TriggerActionY(this.dna.GetGene("seeUp"));
    }
    if (this.sensorHit.seeDown || this.collision.seeDown) {
      this.TriggerActionY(this.dna.GetGene("seeDown"));
    }
    if (this.sensorHit.seeCanvasWall || this.collision.seeCanvasWall) {
      // debugger;
      this.TriggerActionX(this.dna.GetGene("seeCanvasWall"));
    }

    // if (this.sensorHit.seeCanvasWall || this.collision.seeCanvasWall){
    //   // this.obstructed.right = true;
    //   this.UpdateDirection();
    //   this.TriggerActionY(100, this.DirY());
    // }

    // if (this.collision.seeUpWall){
    //   this.obstructed.right = true;
    //   this.TriggerActionY(this.dna.GetGene("seeUpWall"));
    // }
    // if (this.collision.seeDownWall){
    //   this.obstructed.right = true;
    //   this.TriggerActionY(this.dna.GetGene("seeDownWall"));
    // }

    // Object.keys(this.collision).forEach((key) => {
    //   debugger
    //   if (this.collision[key]){
    //     this.obstructed[key] = true;
    //     // this.Tr
    //   }
    // })

    if (this.sensorHit.seeUp) {
      this.obstructed.up = true;
      return this.dna.GetGene("seeUp");
    } else if (this.sensorHit.seeDown) {
      this.obstructed.down = true;
      return this.dna.GetGene("seeDown");
    } else {
      return this.dna.GetGene("random");
    }
  }

  IsObstructed() {
    return Object.values(this.obstructed).some(value => value === true);
  }

  ResetTriggers() {
    Object.keys(this.sensorHit).forEach(key => {
      this.sensorHit[key] = false;
    });
  }

  ResetObstructions() {
    Object.keys(this.obstructed).forEach(key => {
      this.obstructed[key] = false;
    });
  }

  ResetCollisions() {
    Object.keys(this.collision).forEach(key => {
      this.collision[key] = false;
    });
  }

  TriggerActionX(geneValue) {
    // debugger;
    let directionX = this.DirX() * (geneValue * 0.1);
    if (directionX > 0) {
      this.obstructed.right ? (directionX = 0) : null;
    } else if (directionX < 0) {
      this.obstructed.left ? (directionX = 0) : null;
    }
    this.pos.x += directionX;
        this.UpdateMyElePos();

  }

  TriggerActionY(geneValue, mult = 1) {
    let directionY = mult * (geneValue * 0.1);
    if (directionY > 0) {
      this.obstructed.down ? (directionY = 0) : null;
    } else if (directionY < 0) {
      this.obstructed.up ? (directionY = 0) : null;
    }

    this.pos.y += directionY;
        this.UpdateMyElePos();

    // if (isNaN(this.pos.y) || isNaN(this.pos.x)) {
    //   debugger
    //   console.log("NAN VALUE FOUND")
    // }
  }

  Update() {

    if (this.goalReached || !this.alive) {
      this.StopUpdates();
      return false;
    }
      this.UpdateMyElePos();

    // read DNA
    const velocity = this.speed; //1.0; //dna.GetGene(0);
    const h = this.GetTriggerGene() || 0;
    this.ResetTriggers();

    let directionX = this.DirX() * velocity;
    if (directionX > 0) {
      this.obstructed.right ? (directionX = 0) : null;
    } else if (directionX < 0) {
      this.obstructed.left ? (directionX = 0) : null;
    }

    let directionY = this.DirY() * velocity;
    if (directionY > 0) {
      this.obstructed.down ? (directionY = 0) : null;
    } else if (directionY < 0) {
      this.obstructed.up ? (directionY = 0) : null;
    }

    // if (isNaN(this.pos.y) || isNaN(this.pos.x)) {
    //   debugger
    //   console.log("NAN VALUE FOUND")
    // }
    // if (isNaN(directionX)|| isNaN(directionY)){
    //   console.log("NAN VALUE:UPDATE")
    //   debugger
    // }

    this.pos.x += directionX;
    this.pos.y += directionY;
    this.UpdateMyElePos();
    // this.pos.x += this.DirX() * velocity;
    // this.pos.y += this.DirY() * (h * 0.1);

    this.distanceTraveled = Util.getDistance(this, this.startPos);
    // debugger

    if (
      Util.getDistance(this, this.target.GetCenterPos()) <= ENTITY_GOAL_RADIUS
    ) {
      this.goalReached = true;
      return false;
    } else {
      this.ResetObstructions();
      this.ResetCollisions();
      this.UpdateDirection();
    }
    return false;
  }

  UpdateDirection() {
    // debugger
    this.dx = Util.isALeftOfB(this, this.target.GetCenterPos())
      ? (this.dx = 1)
      : (this.dx = -1);
    this.dy = Util.isAAboveB(this, this.target.GetCenterPos())
      ? (this.dy = 1)
      : (this.dy = -1);
  }

  StopUpdates() {
    clearInterval(this.interval);
    if (!this.alive) console.log(`An entity has died`);
    if (!this.goalReached) console.log("Sucess");
  }

  Render(ctx) {
    // ctx.beginPath();
    // ctx.arc(this.PosX(), this.PosY(), this.radius, 0, Math.PI * 2);
    // ctx.fillStyle = this.color;
    // ctx.fill();
    // ctx.closePath();

    Object.values(this.sensorRays).forEach(sensorRay => {
      sensorRay.Render(ctx);
    });
    this.RenderPos(ctx);
    // this.RenderEye(ctx);

    // //ENERGY SHIELD
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, ENTITY_SENSOR_RANGE, 0, Math.PI * 2);
    // ctx.strokeStyle = "#0095DD";
    // ctx.stroke();
    // ctx.closePath();
  }

  CreateMyEle(){
      const canvasEl = document.getElementsByClassName("canvas-container")[0];
      const newEle = document.createElement("BUTTON");
      newEle.className = "thing";
      newEle.style.padding = this.radius + "px";
      newEle.style.zIndex = this.id;
      newEle.style.backgroundColor = this.color;
      canvasEl.insertBefore(newEle, canvasEl.firstChild);
      this.UpdateMyElePos();
      return newEle;
  }

  UpdateMyElePos(){
    if (!this.myEle) return;
    
    // this.dx = 0;
    // this.dy = 0;

    // const canvasEl = document.getElementsByTagName("canvas")[0];
    // const rect = canvasEl.getBoundingClientRect();
    // const xPosition = this.PosX() + rect.left + window.pageXOffset - this.myEle.offsetWidth / 2 + this.radius / 2;
    // const yPosition = this.PosY() + rect.top + window.pageYOffset - this.myEle.offsetHeight / 2 + this.radius / 2;
    // this.myEle.style.left = xPosition + "px";
    // this.myEle.style.top = yPosition + "px";

    // this.myEle.style.left = xPosition - (widthXY*0.85) + "px";
    // this.myEle.style.top = yPosition + (widthXY*1.22) + "px";
    // this.myEle.innerHTML = `X: ${xPosition} Y: ${yPosition}`;

    const xPosition = this.PosX() - this.radius;
    const yPosition = this.PosY() - this.radius;
    this.myEle.style.left = xPosition + "px";
    this.myEle.style.top = yPosition + "px";
  }

  RenderEye(ctx) {
    const img = window.eyes[0];
    ctx.drawImage(
      img,
      this.PosX() - this.radius,
      this.PosY() - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }

  Destroy() {
    this.StopUpdate();

    delete this.startPos;
    this.startPos = null;

    this.dna.Destroy();
    this.myEle.remove();

    //DESTROY SENSORS AND DNA BEFORE SELF
    if (Object.keys(this.sensorRays).length > 0) {
      Object.keys(this.sensorRays).forEach(key => {
        this.sensorRays[key].Destroy();
      });
    }
    this.sensorRays = null;

    delete this;
  }
}


export const CreateEntities = (amount, startBox, game, target) =>{
    const entities = [];
    const idStart = 2; //ID coresponds to z-index in css
    for (let i = 0; i < amount; i++) {

      entities[i] = new Entity(game, startBox, target, idStart + i); 
    }
    return entities;
}

export default Entity;