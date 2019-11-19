import * as Util from './util';
import Form from "./form";
import Gene from './gene';

class DNA extends Form{
  constructor(savedGeneValues = {}) {
    super();
    this.genes = {
      speed: new Gene(1, 8, savedGeneValues.speed),
      size: new Gene(8, 18, savedGeneValues.size),
      seeUp: new Gene(-250, 250, savedGeneValues.seeUp),
      seeDown: new Gene(-250, 250, savedGeneValues.seeDown),
      seeRight: new Gene(-250, 250, savedGeneValues.seeRight),
      seeLeft: new Gene(-250, 250, savedGeneValues.seeLeft),
      seeUpWall: new Gene(-250, 250, savedGeneValues.seeUpWall),
      seeDownWall: new Gene(-250, 250, savedGeneValues.seeDownWall),
      seeCanvasWall: new Gene(-250, 250, savedGeneValues.seeCanvasWall),

      sensorRange: new Gene(4, 22, savedGeneValues.sensorRange),
      sensorThickness: new Gene(1, 4, savedGeneValues.sensorThickness),
      random: new Gene(-250, 250, savedGeneValues.random),

      colorR: new Gene(50, 255, savedGeneValues.colorR),
      colorG: new Gene(50, 155, savedGeneValues.colorG),
      colorB: new Gene(50, 155, savedGeneValues.colorB)
    };

    this.GetGene = this.GetGene.bind(this);
    this.Combine = this.Combine.bind(this);
    this.Mutate = this.Mutate.bind(this);
    this.ExtractGeneValues = this.ExtractGeneValues.bind(this);
  }

  GetGene(geneKey) {
    return this.genes[geneKey].value;
  }
  Combine(dna1, dna2) {
    const geneKeys = Object.keys(this.genes);
    for (let i = 0; i < geneKeys.length; i++) {
      // debugger;
      this.genes[geneKeys[i]] =
        Util.getRandomInt(0, 10) < 5
          ? dna1.genes[geneKeys[i]].Dup()
          : dna2.genes[geneKeys[i]].Dup();
    }
  }
  Mutate() {
    const geneKeys = Object.keys(this.genes);
    this.genes[geneKeys[Util.getRandomInt(0, geneKeys.length - 1)]].Randomize();
  }
  Destroy() {
    //DESTROY GENES BEFORE SELF
    if (Object.keys(this.genes).length > 0){
      Object.keys(this.genes).forEach(key => {
        this.genes[key].Destroy();
      });
    }
    delete this;
  }

  ExtractGeneValues(){
    const geneVals = {};
    if (Object.keys(this.genes).length > 0) {
      Object.keys(this.genes).forEach(key => {
        geneVals[key] = this.GetGene(key);
      });
    }
    return geneVals;
  }

  // SetRandom(){
  //   for (let i = 0; i < this.dnaLength; i++) {
  // 		this.genes[i] = Util.getRandomInt(-this.maxValues, this.maxValues);
  //   }
  // }
  // GetGene(pos){
  // 	return this.genes[pos];
  // }
  // Combine(dna1, dna2){
  //   for (let i = 0; i < this.dnaLength; i++) {
  // 		this.genes[i] = Util.getRandomInt(0, 10) < 5 ? dna1.genes[i] : dna2.genes[i];
  //   }
  // }
  // Mutate(){
  // 	this.genes[Util.getRandomInt(0, this.dnaLength - 1)] = Util.getRandomInt(-this.maxValues, this.maxValues);
  // }
}

export default DNA;