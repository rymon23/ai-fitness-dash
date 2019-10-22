import * as Util from "./util";
import Canvas from "./canvas";
import PopulationManager from "./pop_manager";
import SliderSetting from "./slider";
import Modal from "./modal";
import Timer from "./timer";
import Box from "./box";
import { CreateBalls } from "./ball";
import { CreateColumns } from "./column";

class Game {
  constructor(canvasEl) {
    this.ctx = canvasEl.getContext("2d");
    // this.canvas = canvasEl;
    this.canvas = new Canvas(this, canvasEl);
    this.timer = new Timer(this);
    this.gameObjects = {
      balls: [],
      boxes: [],
      columns: [],
      entities: []
    };

    this.settings = {
      roundTime: 15,
      populationSize: 20,
      topBreedMult: 30,
      mutationPerc: 3
    };

    window.game = this;

    this.modal = new Modal("modal");

    this.sliders = {
      roundTime: new SliderSetting(
        "slider-duration",
        "slider-duration-value",
        "roundTime"
      ),
      populationSize: new SliderSetting(
        "slider-pop",
        "slider-pop-value",
        "populationSize"
      ),
      topBreedMult: new SliderSetting(
        "slider-top-perc",
        "slider-top-perc-value",
        "topBreedMult"
      ),
      mutationPerc: new SliderSetting(
        "slider-mutation",
        "slider-mutation-value",
        "mutationPerc"
      )
    };

    this.PopulationManager;
    // this.interval;

    this.Init = this.Init.bind(this);
    this.Start = this.Start.bind(this);
    this.Stop = this.Stop.bind(this);
    this.Update = this.Update.bind(this);
    this.NextRound = this.NextRound.bind(this);
    this.Reset = this.Reset.bind(this);
    this.ResetSliderDefaults = this.ResetSliderDefaults.bind(this);
    this.RenderGameObjects = this.RenderGameObjects.bind(this);
    this.DestroyGameObjects = this.DestroyGameObjects.bind(this);
    this.CanvasCollisionDetection = this.CanvasCollisionDetection.bind(this);

    this.Init();
  }

  Init() {
    const startBoxHeight = this.canvas.height / 2;
    const startBoxWidth = 60;
    const startBoxY = this.canvas.height / 2 / 2;
    const startBoxX = 0 + this.canvas.borders.left.GetWidth();

    const startBox = new Box(
      this,
      startBoxX,
      startBoxY,
      startBoxHeight,
      startBoxWidth
    );
    const finishBox = new Box(
      this,
      this.canvas.width - startBoxWidth - this.canvas.borders.right.GetWidth(),
      startBoxY,
      startBoxHeight,
      startBoxWidth
    );
    this.gameObjects.boxes.push(startBox);
    this.gameObjects.boxes.push(finishBox);
    this.PopulationManager = new PopulationManager(this, startBox, finishBox);

    console.log("GAME INITIALIZED");

    const restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", () => {
        this.modal.Enable();
        this.Stop()
        this.DestroyGameObjects();
    });

  }

  Start(nextRound = false) {
    console.log("GAME STARTED");
    this.running = true;
    this.canvas.Init();
    
    // this.gameObjects.balls = CreateBalls(2, this.gameObjects.boxes[1]);
    this.gameObjects.columns = CreateColumns(125, this);
    // this.gameObjects.entities = [];
    // debugger
    if (nextRound) {
      this.PopulationManager.BreedNewPopulation();
    }else{
      this.PopulationManager.Init();
    }
    this.gameObjects.entities = this.PopulationManager.population;

    this.timer.Start(this.settings.roundTime);
    // this.interval = setInterval(this.Update, 10);

    this.globalID = requestAnimationFrame(this.Update);
  }
  Stop() {
    this.running = false;
    this.timer.Stop();
    cancelAnimationFrame(this.updateID);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    console.log("GAME STOPPED");
  }
  NextRound(){
    this.Stop();
    this.DestroyGameObjects();
    this.Start(true);
    console.log("NEXT ROUND");
  }
  Reset() {
    this.Stop();
    this.DestroyGameObjects();
    console.log("GAME RESET");
  }
  Update() {
    if (!this.running) return;

    if (this.timer.timeUp) {
      this.NextRound();
      return;
    }
    this.RenderGameObjects();
    this.CanvasCollisionDetection(this.canvas);
    this.globalID = requestAnimationFrame(this.Update);
  }

  ResetSliderDefaults(){
    Object.keys(this.settings).forEach((key) => {
      this.sliders[key].SetDefault();
    });
  }

  RenderGameObjects() {
    if (!this.running) return;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.RenderBorders(ctx);

    if (Object.values(this.gameObjects).length === 0) return;
    Object.values(this.gameObjects).forEach(array => {
      if (array.length > 0) {
        array.forEach(gameObject => {
          if (gameObject) gameObject.Render(ctx);
        });
      }
    });
    // this.globalID = requestAnimationFrame(this.RenderGameObjects);
  }

  CanvasCollisionDetection(canvas) {
    if (Object.values(this.gameObjects).length === 0) return;

    Object.values(this.gameObjects).forEach(array => {
      if (array.length > 0) {
        array.forEach(gameObject => {
          if (gameObject && gameObject != this && !gameObject.isStatic) {
            const canvasHitX =
              gameObject.PosX() + gameObject.DirX() < gameObject.GetWidth() ||
              gameObject.PosX() + gameObject.GetWidth() + gameObject.DirX() >
                canvas.width;

            const canvasHitY =
              gameObject.PosY() + gameObject.DirY() < gameObject.GetHeight() ||
              gameObject.PosY() + gameObject.GetHeight() + gameObject.DirY() >
                canvas.height;

            if (gameObject.HasTag("ball")) {
              if (canvasHitX) gameObject.dx = -gameObject.dx;
              if (canvasHitY) gameObject.dy = -gameObject.dy;
            } else {
              if (canvasHitX) gameObject.dx = 0;
              if (canvasHitY) gameObject.dy = 0;
            }
          }
        });
      }
    });
  }

  DestroyGameObjects() {
    if (Object.values(this.gameObjects).length === 0) return;
    Object.values(this.gameObjects).forEach(array => {
      if (array.length > 0) {
        array.forEach(gameObject => {
          if (!gameObject.HasTag("box")) {
            gameObject.Destroy();
          }
        });
      }
    });
  }
}

export default Game;