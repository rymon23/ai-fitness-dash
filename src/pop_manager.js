import * as Util from "./util";
import Entity from "./entity";

const POPULATION_SIZE = 8;
const BREED_TOP_PERCENT = 0.4;
const MUTATION_PERCENT = 6;

class PopulationManager {
  constructor(game, startBox, finishBox) {
    this.game = game;
    this.startBox = startBox;
    this.finishBox = finishBox;

    this.population = [];
    this.generation = 1;

    this.interval;

    this.CompareEntities = this.CompareEntities.bind(this);
    this.Breed = this.Breed.bind(this);
    this.BreedNewPopulation = this.BreedNewPopulation.bind(this);
    this.DisplayGeneration = this.DisplayGeneration.bind(this);
    this.Init();
  }

  Init() {
    for (let i = 0; i < POPULATION_SIZE; i++) {
      // const xyPos = Util.getRandomBoxPos(this.startBox);
      const entity = new Entity(this.game, this.startBox.GetCenterPos(), this.finishBox);
      this.population.push(entity);
    }
    console.log("POPULATION MANAGER: First Gen Created");
    this.DisplayGeneration();
  }

  DisplayGeneration(){
    console.log(`GEN: ${this.generation}`);
    document.getElementById("gen").innerHTML = `Gen: ${this.generation}`;
  }

  CompareEntities(a, b) {
    if (a.distanceTravelled < b.distanceTravelled) {
      return -1;
    } else if (a.distanceTravelled > b.distanceTravelled) {
      return 1;
    } else {
      return 0;
    }
  }

  Breed(parent1, parent2) {
    // const xyPos = Util.getRandomBoxPos(this.startBox);
    const offspring = new Entity(this.game, this.startBox.GetCenterPos(), this.finishBox);
    if (Util.getRandomInt(0, 100) < MUTATION_PERCENT) {
      offspring.dna.Mutate();
    } else {
      offspring.dna.Combine(parent1.dna, parent2.dna);
    }
    return offspring;
  }

  BreedNewPopulation() {
    console.log("BREED NEW POPULATION");

    const sortedPop = this.population.sort((a, b) => {
        this.CompareEntities(a, b);
      }).slice(0, Math.floor(this.population.length * BREED_TOP_PERCENT) || 1 );

    this.population = [];
    // debugger

    while (this.population.length < POPULATION_SIZE){
        const randIx = Util.getRandomInt(0, sortedPop.length - 1);
        this.population.push(this.Breed(
            sortedPop[randIx]
            , sortedPop[(randIx + 1) % sortedPop.length]));
    }
    // debugger

    //destroy all parents and previous population
    for (let i = 0; i < sortedPop.length; i++) {
      delete sortedPop[i];
    }
    this.generation++;
    // debugger
    this.DisplayGeneration();
  }
}

export default PopulationManager;