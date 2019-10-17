import * as Util from "./util";
import Canvas from "./canvas";
import PopulationManager from "./pop_manager";
import Box from "./box";
import Ball from "./ball";
import { CreateEntities } from "./entity";
import { CreateColumns } from "./column";



class Game {
  constructor(canvasEl) {
    this.ctx = canvasEl.getContext("2d");
    this.canvas = new Canvas(this, canvasEl);

    this.gameObjects = {
      balls: [],
      boxes: [],
      columns: [],
      entities: []
    };
    this.PopulationManager;
    this.interval;

    this.Start = this.Start.bind(this);
    this.RunGame = this.RunGame.bind(this);
    this.Stop = this.Stop.bind(this);
    this.Update = this.Update.bind(this);
    this.Draw = this.Draw.bind(this);
    this.RenderGameObjects = this.RenderGameObjects.bind(this);
    this.CanvasCollisionDetection = this.CanvasCollisionDetection.bind(this);

    this.Start();
  }

  Start() {
    console.log("GAME STARTED");
    this.RunGame();
  }
  Stop() {
    this.running = false;
    clearInterval(this.interval);
    console.log("GAME STOPPED");
  }
  Update(){
    this.Draw();
    this.CanvasCollisionDetection(this.canvas.canvasEl);
  }

  RunGame() {
    this.running = true;
    const startBoxHeight = this.canvas.height / 2;
    const startBoxWidth = 60;
    const startBoxY = this.canvas.height / 2 / 2;
    const startBoxX = 0;

    const startBox = new Box(
      this,
      startBoxX,
      startBoxY,
      startBoxHeight,
      startBoxWidth,
      "rgba(0, 0, 255, 0.5)"
    );
    this.gameObjects.boxes.push(startBox);

    const finishBox = new Box(
        this,
        this.canvas.width - startBoxWidth,
        startBoxY,
        startBoxHeight,
        startBoxWidth,
        "rgba(0, 0, 255, 0.5)"
    )
    this.gameObjects.boxes.push(finishBox);
  

    const startBoxCenter = startBox.GetCenterPos();
    this.PopulationManager = new PopulationManager(this, startBox, finishBox)

    this.gameObjects.balls.push(new Ball(this, 100, 100)); //startBoxCenter.x, startBoxCenter.y));
    this.gameObjects.columns = CreateColumns(125, this);

    // this.gameObjects.entities = CreateEntities(2, startBox, this);
    this.gameObjects.entities = this.PopulationManager.population;
   // this.canvas.Init();
    this.PopulationManager.Start()

    this.interval = setInterval(this.Update, 10);
  }

  Draw() {
    if (!this.running) return;
    // debugger

      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.RenderGameObjects(ctx);
  }

  RenderGameObjects(ctx) {
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

}

export default Game;