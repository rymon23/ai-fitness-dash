import * as Util from "./util";
import GameObject from "./gameobject";
import DNA from "./dna";
import Vector2 from "./vector2";
import { game } from "./index";

const DNA_LENGTH = 5;
const ENTITY_SENSOR_RANGE = 35;

class Entity extends GameObject {
  constructor(game, x, y) {
    super();
    this.game = game;
    this.pos = { x, y };
    this.startPos = new Vector2(this.PosX(), this.PosY());
    this.dx = 1;
    this.dy = 1;
    this.dna = new DNA(DNA_LENGTH, 200);
    this.isStatic = false;
    this.hasSensors = true;
    this.distanceTraveled = 0;

    this.sensorHit = {
      seeDownWall: false,
      seeUpWall: false,
      seeBottom: false,
      seeTop: false
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

  SetSensorHit(trigger){
    debugger
    if (Object.keys(this.sensorHit).includes(trigger)){
      debugger
      this.sensorHit.trigger = true;
    };
  }

  GetTriggerGene(){
    debugger
    if(this.sensorHit.seeUpWall){
      return this.dna.GetGene(0);
    } else if (this.sensorHit.seeDownWall){
      return this.dna.GetGene(1);
    } else if (this.sensorHit.seeTop){
      return this.dna.GetGene(2);
    } else if (this.sensorHit.seeBottom){
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
  }

  Update() {
    if (this.goalReached || !this.alive) {
      this.StopUpdates();
      return;
    }

    // read DNA
    const velocity = 1.0; //dna.GetGene(0);
    const h = this.GetTriggerGene() || 0;
    debugger
    this.ResetTriggers();


    //debugger
    //BOUNCE
    // this.pos.x += this.DirX();
    // this.pos.y += this.DirY();

    this.pos.x += this.DirX() * velocity;
    this.pos.y += this.DirY() * (h * 0.1);
    this.distanceTravelled = Util.getDistance(this, this.startPos);
    debugger
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

    //SENSORS
    const offset = this.GetWidth() / 2;
    ctx.beginPath();
    ctx.rect(this.PosX(), this.PosY() - offset, 1, -ENTITY_SENSOR_RANGE); //TOP
    ctx.rect(this.PosX(), this.PosY() + offset, 1, ENTITY_SENSOR_RANGE); //BOTTOM
    ctx.rect(this.PosX() + offset, this.PosY(), ENTITY_SENSOR_RANGE, 1); //RIGHT
    ctx.rect(this.PosX() - offset, this.PosY(), -ENTITY_SENSOR_RANGE, 1); //LEFT
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();

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