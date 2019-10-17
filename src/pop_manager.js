
import * as Util from "./util";
import Entity, { CreateEntities } from "./entity";
import Box from "./box";
import Ball from "./ball";
import { CreateColumns } from "./column";

const POPULATION_SIZE = 4;
const TRIAL_DURATION = 60; //in seconds

class PopulationManager {
    constructor(game, canvas, startBox) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.game = game;
        this.startBox = startBox;
        
        this.population = [];
        this.generation = 1;

        this.interval;

        this.Start();
    }

    Start(){
        setTimeout(this.BreedNewPopulation, TRIAL_DURATION * 1000);
    }

    CompareEntities(a, b) {
        if (a.distanceTravelled < b.distanceTravelled) {
            return -1;
        } else if (a.distanceTravelled > b.distanceTravelled) {
            return 1;
        }else {
            return 0
        }
    }

    Breed(parent1, parent2){
        const xyPos = Util.getRandomBoxPos(this.startBox);
        const offspring = new Entity(this.game, xyPos[0], xyPos[1]);

        if (Util.getRandomInt(0, 100) == 1) //mutate 1 in 100
        {
            offspring.dna.Mutate();
        }
        else {
            offspring.dna.Combine(parent1.dna, parent2.dna);
        }
        return offspring;
    }

    BreedNewPopulation(){
        const sortedPop = this.population.sort(this.CompareEntities(a,b)).slice();
        this.population = [];
        
        for (let i = (3 * sortedPop.Count / 4.0) - 1; i < sortedPop.Count - 1; i++)
        {
            population.push(Breed(sortedPop[i], sortedPop[i + 1]));
            population.push(Breed(sortedPop[i + 1], sortedPop[i]));
            population.push(Breed(sortedPop[i], sortedPop[i + 1]));
            population.push(Breed(sortedPop[i + 1], sortedPop[i]));
        }

        //destroy all parents and previous population
        for (let i = 0; i < sortedPop.Count; i++)
        {
            delete sortedPop[i];
        }
        this.generation++;       
    }

    Update(){

    }
    
}


export default PopulationManager;