import * as Util from "./util";
import Canvas from "./canvas";
import PopulationManager from "./pop_manager";
import Box from "./box";
import { CreateBalls } from "./ball";
import { CreateColumns } from "./column";


class Game {
  constructor(canvasEl) {
    this.ctx = canvasEl.getContext("2d");
    // this.canvas = canvasEl;
    this.canvas = new Canvas(this, canvasEl);

    this.gameObjects = {
      balls: [],
      boxes: [],
      columns: [],
      entities: []
    };
    this.PopulationManager;
    this.interval;

    this.Init = this.Init.bind(this);
    this.Start = this.Start.bind(this);
    this.Stop = this.Stop.bind(this);
    this.Update = this.Update.bind(this);
    this.Reset = this.Reset.bind(this);
    this.RenderGameObjects = this.RenderGameObjects.bind(this);
    this.CanvasCollisionDetection = this.CanvasCollisionDetection.bind(this);

    this.Init();
  }

  Init(){
    const startBoxHeight = this.canvas.height / 2;
    const startBoxWidth = 60;
    const startBoxY = this.canvas.height / 2 / 2;
    const startBoxX = 0;

    const startBox = new Box(
      this,
      startBoxX,
      startBoxY,
      startBoxHeight,
      startBoxWidth
    );
    const finishBox = new Box(
        this,
        this.canvas.width - startBoxWidth,
        startBoxY,
        startBoxHeight,
        startBoxWidth
    )    
    this.gameObjects.boxes.push(startBox);
    this.gameObjects.boxes.push(finishBox);
    this.PopulationManager = new PopulationManager(this, startBox, finishBox);

    console.log("GAME INITIALIZED");
    this.Start();
  }

  Start() {
    console.log("GAME STARTED");
    this.running = true;

    this.gameObjects.balls = CreateBalls(2, this.gameObjects.boxes[1]);
    this.gameObjects.columns = CreateColumns(125, this);
    this.gameObjects.entities = this.PopulationManager.population;
    this.canvas.Init();
    this.PopulationManager.Start()

    this.interval = setInterval(this.Update, 10);
  }

  Update(){
    this.RenderGameObjects();
    this.CanvasCollisionDetection(this.canvas);
  }

  Stop() {
    this.running = false;
    clearInterval(this.interval);
    console.log("GAME STOPPED");
  }

  Reset(){
    console.log("GAME RESETTING");
    this.Stop();
    this.Start();
  }

  RenderGameObjects() {
    if (!this.running) return;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.RenderBorders(ctx);

    if (Object.values(this.gameObjects).length === 0) return;
    Object.values(this.gameObjects).forEach((array) => {
      if (array.length > 0) {
        array.forEach(gameObject => {
          if (gameObject) gameObject.Render(ctx);
        });
      }
    });
    
  }

  CanvasCollisionDetection(canvas) {
    if (Object.values(this.gameObjects).length === 0) return;

    Object.values(this.gameObjects).forEach((array) => {
      if (array.length > 0) {
        array.forEach(gameObject => {
          if (gameObject && gameObject != this && !gameObject.isStatic) { 
            const canvasHitX = (gameObject.PosX() + gameObject.DirX() < gameObject.GetWidth()
              || gameObject.PosX() + gameObject.GetWidth() + gameObject.DirX() > canvas.width);

            const canvasHitY = (gameObject.PosY() + gameObject.DirY() < gameObject.GetHeight()
              || gameObject.PosY() + gameObject.GetHeight() + gameObject.DirY() > canvas.height);            

            if (gameObject.objectType === "ball"){
              if (canvasHitX) gameObject.dx = -gameObject.dx;
              if (canvasHitY) gameObject.dy = -gameObject.dy;             
            }else {
              if (canvasHitX) gameObject.dx = 0;
              if (canvasHitY) gameObject.dy = 0;      
            }
          }
        });
      }
    });    

  }

  // DeleteGameObjects(){
  //   if (Object.values(this.gameObjects).length === 0) return;

  //   Object.values(this.gameObjects).forEach((array) => {
  //     if (array.length > 0) {
  //       array.forEach(gameObject => {
  //         if (gameObject.objectType != "box"){
  //           delete gameObject;
  //         }
  //       });
  //     }
  //   }); 

  // }
}

export default Game;