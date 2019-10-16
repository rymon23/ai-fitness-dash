import * as Util from "./util";
import { CreateEntities } from "./entity";
import Box from "./box";
import Ball from "./ball";
import { CreateColumns } from "./column";


class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.gameObjects = {
      balls: [],
      boxes: [],
      columns: [],
      entities: []
    };
    this.generations = 1;
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
    this.CanvasCollisionDetection(this.canvas);
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

    this.gameObjects.boxes.push(
      new Box(
        this,
        this.canvas.width - startBoxWidth,
        startBoxY,
        startBoxHeight,
        startBoxWidth,
        "rgba(0, 0, 255, 0.5)"
      )
    );
    const startBoxCenter = startBox.GetCenterPos();

    this.gameObjects.balls.push(new Ball(this, 100, 100)); //startBoxCenter.x, startBoxCenter.y));
    this.gameObjects.columns = CreateColumns(125, this);
    this.gameObjects.entities = CreateEntities(2, startBox, this);

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
    if (Object.values(this.gameObjects).length === 0) return;
    // debugger
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

            if (gameObject.PosX() + gameObject.DirX() > canvas.width - gameObject.GetWidth() 
              || gameObject.PosX() + gameObject.DirX() < gameObject.GetWidth()) {
              //  console.log("CANVAS COLLISION DETECTED: X");
                gameObject.dx = -gameObject.dx;
                // return true;
            }
            if (gameObject.PosY() + gameObject.DirY() > canvas.height - gameObject.GetHeight() 
              || gameObject.PosY() + gameObject.DirY() < gameObject.GetHeight()) {
              //  console.log("CANVAS COLLISION DETECTED: Y");
                gameObject.dy = -gameObject.dy;
                // return true;
            }
          }
        });
      }
    });    

  }

}

export default Game;