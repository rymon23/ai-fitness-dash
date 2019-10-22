import * as Util from "./util";
import Entity from "./entity";

// const POPULATION_SIZE = 20;
// const BREED_TOP_PERCENT = 0.28;
// const MUTATION_PERCENT = 5;

class PopulationManager {
  constructor(game, startBox, finishBox) {
    this.game = game;
    this.startBox = startBox;
    this.finishBox = finishBox;

    this.population = [];
    this.generation = 1;

    this.interval;

    this.Init = this.Init.bind(this);
    this.CompareEntities = this.CompareEntities.bind(this);
    this.Breed = this.Breed.bind(this);
    this.BreedNewPopulation = this.BreedNewPopulation.bind(this);
    this.DisplayGeneration = this.DisplayGeneration.bind(this);
    // this.Init();
  }

  Init() {
    for (let i = 0; i < this.game.settings.populationSize; i++) {
      // const xyPos = Util.getRandomBoxPos(this.startBox);
      const entity = new Entity(this.game, this.startBox.GetCenterPos(), this.finishBox);
      this.population.push(entity);
    }
    console.log("POPULATION MANAGER: First Gen Created");
    this.DisplayGeneration();
  }

  DisplayGeneration(){
    console.log(`GEN: ${this.generation}`);
    // if (this.generation < 10){
    //   document.getElementById("gen").innerHTML = `Generation: 0${this.generation}`;
    //   return
    // }
    document.getElementById("gen").innerHTML = `Generation: `;
    document.getElementById("gen-counter").innerHTML = `${this.generation}`;
  }

  DisplaySucessRate(){
    let successCount = 0;
    for (let i = 0; i < this.population.length; i++) {
      const entity = this.population[i];
      entity.goalReached? 
        successCount++ : null;
    }
    document.getElementById("gen").innerHTML = `Gen: ${this.generation}`;
  }
  DisplayRanks(){
    const suceeded = this.population.slice().filter((entity) => {
      entity.goalReached === true;
    }).sort((a, b) => {
      this.CompareEntities(a, b);
    })

    debugger
    document.getElementById("ranks").innerHTML = `Ranks:`;
    
    for (let i = 0; i < suceeded.length; i++) {
      const entity = this.population[i];
      Util.addElement("ranks", "div", `distance traveled: ${entity.distanceTraveled}`, false);
    }
  }

  CompareEntities(a, b) {
    if (a.distanceTraveled < b.distanceTraveled) {
      return 1;
    } else if (a.distanceTraveled > b.distanceTraveled) {
      return -1;
    } else {
      return 0;
    }
  }

  Breed(parent1, parent2) {
    // const xyPos = Util.getRandomBoxPos(this.startBox);
    const offspring = new Entity(this.game, this.startBox.GetCenterPos(), this.finishBox);
    if (Util.getRandomInt(0, 100) < this.game.settings.mutationPerc) {
      offspring.dna.Mutate();
    } else {
      offspring.dna.Combine(parent1.dna, parent2.dna);
    }
    return offspring;
  }

  BreedNewPopulation() {
    console.log("BREED NEW POPULATION");

    const sortedPop = this.population
      .sort((a, b) => {
        return this.CompareEntities(a, b);
      }).slice(0 
          ,Math.floor(this.population.length * this.game.settings.topBreedMult * 0.01) 
            || 1
      );

    this.population = [];
    // debugger

    while (this.population.length < this.game.settings.populationSize) {
      const randIx = Util.getRandomInt(0, sortedPop.length - 1);
      this.population.push(
        this.Breed(
          sortedPop[randIx],
          sortedPop[(randIx + 1) % sortedPop.length]
        )
      );
    }
    // debugger

    //destroy all parents and previous population
    for (let i = 0; i < sortedPop.length; i++) {
      delete sortedPop[i];
    }
    this.generation++;
    this.DisplayGeneration();
  }
}

export default PopulationManager;