import * as Util from "./util";
import GameObject from "./gameobject";
import DNA from "./dna";
import Vector2 from "./vector2";
import { CreateSensorRays } from "./sensor_ray";

const DNA_LENGTH = 5;
const ENTITY_SENSOR_RANGE = 28;
const ENTITY_GOAL_RADIUS = 85;

class Entity extends GameObject {
  constructor(game, x, y, target = null) {
    super();
    this.game = game;
    this.pos = { x, y };
    this.startPos = new Vector2(this.PosX(), this.PosY());
    this.target = target;
    this.objectType = "entity";

    this.dx = 1;
    this.dy = 1;
    this.dna = new DNA(DNA_LENGTH, 200);
    this.isStatic = false;
    this.hasSensors = true;
    this.distanceTraveled = 0;

    this.obstructed = {};

    this.sensorRays = CreateSensorRays(this);

    this.sensorHit = {
      seeDownWall: false,
      seeUpWall: false,
      seeBottom: false,
      seeTop: false,
      seeCanvasWall: false,
    };

    this.speed = Util.getRandomInt(2, 5);
    this.color = "#000000";
    this.goalReached = false;
    this.alive = true;
    this.timeAlive = 0.0;
    this.crashes = 0;
    this.finishBoxDist = 0;
    this.radius = 10;

    this.SensorX = this.SensorX.bind(this);
    this.SensorY = this.SensorY.bind(this);
    this.SetSensorHit = this.SetSensorHit.bind(this);
    this.GetTriggerGene = this.GetTriggerGene.bind(this);
    this.ResetTriggers = this.ResetTriggers.bind(this);
    this.IsObstructed = this.IsObstructed.bind(this);
    this.ResetObstructions = this.ResetObstructions.bind(this);

    this.ResetObstructions();
    this.Init();
  }

  GetWidth() {
    return this.radius;
  }
  GetHeight() {
    return this.radius;
  }
  SensorX(right = true){
    if(right) return this.PosX() + ENTITY_SENSOR_RANGE; //RIGHT
    return this.PosX() - ENTITY_SENSOR_RANGE; //LEFT
  }
  SensorY(bottom = true){
    if(bottom) return this.PosY() + ENTITY_SENSOR_RANGE; //BOTTOM
    return this.PosY() - ENTITY_SENSOR_RANGE; //TOP
  }

  SensorCheck(object){
      if (this.sensorRays.right.CheckCollision(object)) return;
      if (this.sensorRays.up.CheckCollision(object)) return;
      if (this.sensorRays.down.CheckCollision(object)) return;
      if (this.sensorRays.left.CheckCollision(object)) return;
      return;
  }

  SetSensorHit(trigger){
    if (Object.keys(this.sensorHit).includes(trigger)){
      this.sensorHit[trigger] = true;
    }
  }

  // OnCollisionEnter(col)
  //   {
  //       if(col.gameObject.tag == "dead" ||
  //       	col.gameObject.tag == "top" ||
  //       	col.gameObject.tag == "bottom" ||
  //       	col.gameObject.tag == "upwall" ||
  //       	col.gameObject.tag == "downwall")
  //       {
  //           crash++;
  //       }
  // }

  GetTriggerGene(){
    // debugger
    if(this.sensorHit.seeUpWall){
      this.obstructed.right = true;
      return this.dna.GetGene(0);
    } else if (this.sensorHit.seeDownWall){
      this.obstructed.right = true;
      return this.dna.GetGene(1);
    } else if (this.sensorHit.seeTop){
      this.obstructed.top = true;
      return this.dna.GetGene(2);
    } else if (this.sensorHit.seeBottom){
      this.obstructed.down = true;
      return this.dna.GetGene(3);
    }else{
      return this.dna.GetGene(4);
    }
  }

  ResetTriggers(){
    this.sensorHit.seeUpWall = false;
    this.sensorHit.seeDownWall = false;
    this.sensorHit.seeTop = false;
    this.sensorHit.seeBottom = false;
    this.sensorHit.seeCanvasWall = false;
  }

  IsObstructed(){
    return Object.values(this.obstructed).some(value => value === true);
  }

  ResetObstructions(){
    this.obstructed = {
      up: false,
      down: false,
      left: false,
      right: false
    };     
  }

  Update() {
    if (this.goalReached || !this.alive) {
      this.StopUpdates();
      return;
    }

    // read DNA
    const velocity = 1.0; //dna.GetGene(0);
    const h = this.GetTriggerGene() || 0;
    this.ResetTriggers();

    let directionX = this.DirX() * velocity;
    if (directionX > 0){
      this.obstructed.right ? directionX = 0 : null
    }else if (directionX < 0){
      this.obstructed.left ? directionX = 0 : null;
    }
    // debugger
    
    let directionY = this.DirY() * (h * 0.1);
    if (directionY > 0){
      this.obstructed.down ? directionY = 0 : null
    }else if (directionY < 0){
      this.obstructed.up ? directionY = 0 : null;
    }

    this.pos.x += directionX;
    this.pos.y += directionY;
    // this.pos.x += this.DirX() * velocity;
    // this.pos.y += this.DirY() * (h * 0.1);

    this.distanceTravelled = Util.getDistance(this, this.startPos);
    // debugger

    if (Util.getDistance(this, this.target.GetCenterPos()) <= ENTITY_GOAL_RADIUS){
      this.goalReached = true;
      return    
    }
    
    //Return motion forward
    this.ResetObstructions();
    this.dx = 1;
  }

  StopUpdates() {
    clearInterval(this.interval);
    if (!this.alive) console.log(`An entity has died`);
    if (!this.goalReached) console.log("Sucess");
  }

  Render(ctx) {
    ctx.beginPath();
    ctx.arc(this.PosX(), this.PosY(), this.GetWidth(), 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    Object.values(this.sensorRays).forEach((sensorRay) => {
      sensorRay.Render(ctx);
    });

    //SENSORS
    // const offset = this.GetWidth() / 2;
    // ctx.beginPath();
    // ctx.rect(this.PosX(), this.PosY() - offset, 1, -ENTITY_SENSOR_RANGE); //TOP
    // ctx.rect(this.PosX(), this.PosY() + offset, 1, ENTITY_SENSOR_RANGE); //BOTTOM
    // ctx.rect(this.PosX() + offset, this.PosY(), ENTITY_SENSOR_RANGE, 1); //RIGHT
    // ctx.rect(this.PosX() - offset, this.PosY(), -ENTITY_SENSOR_RANGE, 1); //LEFT
    // ctx.fillStyle = "#ff0000";
    // ctx.fill();
    // ctx.closePath();

    // //ENERGY SHIELD
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, ENTITY_SENSOR_RANGE, 0, Math.PI * 2);
    // ctx.strokeStyle = "#0095DD";
    // ctx.stroke();
    // ctx.closePath();
  }
}

export const CreateEntities = (amount, startBox, game) =>{
    const entities = [];
    for (let i = 0; i < amount; i++) {
        let xyPos = Util.getRandomBoxPos(startBox);
        entities[i] = new Entity(game, xyPos[0], xyPos[1]); 
    }
    return entities;
}

export default Entity;