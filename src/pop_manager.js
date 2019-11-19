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
    this.generation = 1;
    this.population = [];

    this.Init = this.Init.bind(this);
    this.InitializeEntities = this.InitializeEntities.bind(this);
    this.CompareEntities = this.CompareEntities.bind(this);
    this.Breed = this.Breed.bind(this);
    this.BreedNewPopulation = this.BreedNewPopulation.bind(this);
    this.DestroyPopulation = this.DestroyPopulation.bind(this);
    this.DisplayGeneration = this.DisplayGeneration.bind(this);
    this.HarvestPopulationDNA = this.HarvestPopulationDNA.bind(this);
  }

  Init(savedGeneration = 1, savedDNAValues = []) {
    debugger
      
    let savedDna = [{}];
    if (savedDNAValues.length > 0){
      this.generation = savedGeneration;
      savedDna = savedDNAValues.slice(0);
    }else{
      this.generation = 1;
    }

    debugger

    this.population = [];

    const idStart = 2
    for (let i = 0; i < this.game.settings.populationSize; i++) {
      // const xyPos = Util.getRandomBoxPos(this.startBox);
      const entity = new Entity(
        this.game,
        this.startBox.GetCenterPos(),
        this.finishBox,
        idStart + i,
        savedDna[i % savedDna.length]
      );
      this.population.push(entity);
    }
    // console.log("POPULATION MANAGER: First Gen Created");

    debugger

    this.DisplayGeneration();
  }

  InitializeEntities(entites) {
    if (!entites || entites.length === 0) return null;
    for (let i = 0; i < entites.length; i++) {
      const entity = entites[i];
      entity.Init();
    }
    return true;
  }

  DisplayGeneration() {
    console.log(`GEN: ${this.generation}`);
    // document.getElementById("gen").innerHTML = `Generation: `;
    document.getElementById("gen-counter").innerHTML = `${this.generation}`;
  }

  CompareEntities(a, b) {
    debugger
    if (a.goalReached !== b.goalReached){
      if (a.goalReached){
        return -1;
      }else{
        return 1;
      }
    }else{
      if (a.goalReached){
        if (a.timeLeft < b.timeLeft) return 1;
        if (a.timeLeft > b.timeLeft) return -1;
        return 0;        
      }
    }
    if (a.distanceTraveled < b.distanceTraveled) {
      return 1;
    }else if (a.distanceTraveled > b.distanceTraveled) {
      return -1;
    }else {
      return 0;
    }
  }

  Breed(parent1, parent2) {
    // const xyPos = Util.getRandomBoxPos(this.startBox);
    const offspring = new Entity(
      this.game,
      this.startBox.GetCenterPos(),
      this.finishBox
    );
    if (Util.getRandomInt(0, 100) < this.game.settings.mutationPerc) {
      offspring.dna.Mutate();
    } else {
      offspring.dna.Combine(parent1.dna, parent2.dna);
    }
    return offspring;
  }

  BreedNewPopulation(harvestDNA = true) {
    console.log("BREED NEW POPULATION");
    const oldPopulation = this.population;
    const sortedPop = oldPopulation.sort((a, b) => {
      let compare = this.CompareEntities(a, b);
        return compare; //this.CompareEntities(a, b);
      })
      .slice(
        0,
        Math.floor(
          this.population.length * this.game.settings.topBreedMult * 0.01
        ) || 1
      );

    this.population = [];
    debugger

    while (this.population.length < this.game.settings.populationSize) {
      const randIx = Util.getRandomInt(0, sortedPop.length - 1);
      this.population.push(
        this.Breed(
          sortedPop[randIx],
          sortedPop[(randIx + 1) % sortedPop.length]
        )
      );
    }
    debugger

    //destroy all parents and previous population
    // for (let i = 0; i < sortedPop.length; i++) {
    //   delete sortedPop[i];
    // }
    this.DestroyPopulation(oldPopulation);

    this.generation++;
    this.DisplayGeneration();

    debugger
    if (harvestDNA){
      return {
        gen: this.generation,
        dna: this.HarvestPopulationDNA(this.population),
      }
    }else {
      return this.population;
    }
  }

  DestroyPopulation(population) {
    if (Object.values(population).length === 0) return;
    Object.values(population).forEach((entity) => {
      entity.Destroy();
    });
  }

  HarvestPopulationDNA(population){
    if (!population || population.length === 0) return null;
    const harvestedDNA = [];
    for (let i = 0; i < population.length; i++) {
      const entity = population[i];
      harvestedDNA.push(entity.dna.ExtractGeneValues());
    }    
    return harvestedDNA.slice(0);
  }

}

export default PopulationManager;