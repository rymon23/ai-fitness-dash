import * as Util from "./util";
import AFDDataBase from './database';
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
    window.game = this;

    this.ctx = canvasEl.getContext("2d");
    this.canvas = new Canvas(this, canvasEl);
    this.timer = new Timer(this);
    this.PopulationManager;

    this.dataLoaded = false;      
    if (window.indexedDB){
      this.myDataBase = new AFDDataBase();
    }

    this.gameObjects = {
      balls: [],
      boxes: [],
      columns: [],
      entities: []
    };

    this.settings = {
      roundTime: 20,
      populationSize: 20,
      topBreedMult: 40,
      mutationPerc: 10
    };

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

    // this.Init();
  }

  Init() {
    const startBoxHeight = this.canvas.height * 0.25;
    const startBoxWidth = 62;
    const startBoxY = this.canvas.height * 0.5 - startBoxHeight/2; //this.canvas.height / 2 / 2;
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
      this.canvas.width - (startBoxWidth + this.canvas.borders.right.GetWidth()),
      startBoxY,
      startBoxHeight,
      startBoxWidth
    );
    startBox.styles.fillStyle = "rgb(0, 128, 0, 0.45)";
    finishBox.styles.fillStyle = "rgb(245, 9, 9, 0.45)";

    this.gameObjects.boxes.push(startBox);
    this.gameObjects.boxes.push(finishBox);
    this.PopulationManager = new PopulationManager(this, startBox, finishBox);

    if (window.indexedDB){
      this.myDataBase.init().then((response) => {
        debugger
        if (!response || response.length === 0) {
          this.dataLoaded = false;
          console.log("No save data found")
          this.modal.Init();

          // this.myDataBase.create({ gen: 1, bots: [], settings: {} }).then()
        }else {
          this.dataLoaded = true;
          //alert("save data found, loading...");
          this.settings = response[0].settings;
          this.PopulationManager.Init(response[0].gen, response[0].dna);

          console.log("saved data retrieved, ok to delete");

          this.myDataBase.destroy().then(()=> {
            console.log("saved data should be destroyed");
            this.modal.Disable();
            this.Start(true);
          });
        }
        console.log("GAME INITIALIZED");
      });    

    }else {
      this.dataLoaded = false;
      this.modal.Init();
      console.log("GAME INITIALIZED");
    }

    const restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", () => {
      if (window.indexedDB){
        document.location.reload();
      }else {
        this.Stop();
        this.DestroyGameObjects();        
      }
    });
  }

  Start(nextRound = false) {
    console.log("GAME STARTED");
    this.running = true;
    this.canvas.Init();
    
    const startRound = (nextRound = false) => {
      if (!this.dataLoaded){
        if (nextRound){
          this.PopulationManager.BreedNewPopulation(false);
        }else {
          this.PopulationManager.Init();
        }
      }else {
        this.dataLoaded = false;
      }

      // this.gameObjects.balls = CreateBalls(2, this.gameObjects.boxes[1]);
      this.gameObjects.columns = CreateColumns(125, this);
      this.gameObjects.entities = this.PopulationManager.population;

      this.timer.Start(this.settings.roundTime);
      this.globalID = requestAnimationFrame(this.Update);
    }

    if (nextRound) {
      debugger

      if (this.dataLoaded){
        startRound(nextRound);

      }else if (window.indexedDB){
        const savedData = this.PopulationManager.BreedNewPopulation(true);
        savedData.settings = this.settings;
        this.myDataBase.create(savedData).then(()=>{
          //alert("next round data should be saved, ok to refresh page");
          //reftesh
          document.location.reload();
        })

      }else{
        startRound(nextRound);
      }
    }else{
      startRound();
    }
  }

  Stop() {
    this.running = false;
    this.timer.Stop();
    this.modal.Enable(true);

    cancelAnimationFrame(this.updateID);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    console.log("GAME STOPPED");
  }
  NextRound(){
    this.Stop();
    this.gameObjects.entities = [];
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
    // this.canvas.Update();
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