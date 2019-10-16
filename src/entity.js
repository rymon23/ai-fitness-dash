import * as Util from "./util";
import GameObject from "./gameobject";
import DNA from "./dna";
import { game } from "./index";

const DNA_LENGTH = 5;
const ENTITY_SENSOR_RANGE = 35;

class Entity extends GameObject {
  constructor(game, x, y){
    super();
    this.game = game;
    this.dna = new DNA(DNA_LENGTH, 200);
    this.isStatic = false;
    this.triggers = {
      seeDownWall: false,
      seeUpWall: false, 
      seeBottom: false,
      seeTop: false,       
    };
    this.x = x
    this.y = y;
    this.dx = 1;
    this.dy = 0;
    this.speed = Util.getRandomInt(2,5);
    this.color = "#000000";
    this.goalReached = false;
    this.alive = true;
    this.timeAlive = 0.0;
    this.crashes = 0;
    this.finishBoxDist = 0;
    this.radius = 10;

    this.Update = this.Update.bind(this);
    this.StopUpdates = this.StopUpdates.bind(this);
    this.GetDistance = this.GetDistance.bind(this);
    this.interval = setInterval(() => this.Update, 500);
  }
  


  // GetDistance(target){
  //   Util.getDistance(this, target);
  // }

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


  Update() {
    // this.Render();

    if(this.goalReached || !this.alive) {
      this.StopUpdates();
      return;
    }

      this.seeUpWall = false;
      this.seeDownWall = false;
      this.seeTop = false;
      this.seeBottom = false;
      // RaycastHit2D hit = Physics2D.Raycast(eyes.transform.position, eyes.transform.forward, 1.0f);
      // Debug.DrawRay(eyes.transform.position, eyes.transform.forward * 1.0f, Color.red);
      // Debug.DrawRay(eyes.transform.position, eyes.transform.up* 1.0f, Color.red);
      // Debug.DrawRay(eyes.transform.position, -eyes.transform.up* 1.0f, Color.red);

      // if (hit.collider != null){
      //     if(hit.collider.gameObject.tag == "upwall"){
      //         seeUpWall = true;
      //     }else if(hit.collider.gameObject.tag == "downwall"){
      //         seeDownWall = true;
      //     }
      // }

      // hit = Physics2D.Raycast(eyes.transform.position, eyes.transform.up, 1.0f);
        
      // if (hit.collider != null){
      //   if(hit.collider.gameObject.tag == "top"){
      //       seeTop = true;
      //   }
      // }
      // hit = Physics2D.Raycast(eyes.transform.position, -eyes.transform.up, 1.0f);

      // if (hit.collider != null){    
      //     if(hit.collider.gameObject.tag == "bottom"){
      //       seeBottom = true;
      //     }
      // }
      //     timeAlive = PopulationManager.elapsed;
      // }

      // read DNA
      let h = 0;
      let velocity = 1.0; //dna.GetGene(0);

      // if(seeUpWall){ 
      //   h = this.dna.GetGene(0);
      // }else if(seeDownWall){
      //   h = this.dna.GetGene(1);
      // }else if(seeTop){
      //   h = this.dna.GetGene(2);
      // }else if(seeBottom){
      //   h = this.dna.GetGene(3);
      // }else{
      //   h = this.dna.GetGene(4);
      // }

      // this.x += this.dx * velocity;
      // this.y += this.dy * (h * 0.1);

      //BOUNCE
      this.x += this.dx;
      this.y += this.dy;

      // distanceTravelled = Vector3.Distance(startPosition,this.transform.position);
  }

  StopUpdates(){
    clearInterval(this.interval);
    if (!this.alive) console.log(`An entity has died`);
    if (!this.goalReached) console.log('Sucess')
  }

  Render(){
    const ctx = game.ctx;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    //SENSORS
    const offset = this.radius / 2;
    ctx.beginPath();
    ctx.rect(this.x, this.y - offset, 1, -ENTITY_SENSOR_RANGE); //TOP
    ctx.rect(this.x, this.y + offset, 1, ENTITY_SENSOR_RANGE); //BOTTOM
    ctx.rect(this.x + offset, this.y, ENTITY_SENSOR_RANGE, 1); //RIGHT
    ctx.rect(this.x - offset, this.y, -ENTITY_SENSOR_RANGE, 1); //LEFT
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
  // debugger
    const entities = [];

    const randomBoxPos = (startBox) => {
        const padding = 6;
        return [Util.getRandomInt(startBox.pos.x + padding, startBox.width - padding),
          Util.getRandomInt(startBox.pos.y + padding, startBox.height - padding)]
    }

    for (let i = 0; i < amount; i++) {
        let xyPos = randomBoxPos(startBox);
        entities[i] = new Entity(game, xyPos[0], xyPos[1]); 
    }
    return entities;
}

export default Entity;