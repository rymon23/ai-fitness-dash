import * as Util from './util';
import Form from "./form";
import Gene from './gene';

class DNA extends Form{
  constructor() {
    super();
    this.genes = {
      speed: new Gene(1, 8),
      size: new Gene(8, 18),
      seeUp: new Gene(-250, 250),
      seeDown: new Gene(-250, 250),
      seeRight: new Gene(-250, 250),
      seeLeft: new Gene(-250, 250),
      seeUpWall: new Gene(-250, 250),
      seeDownWall: new Gene(-250, 250),
      seeCanvasWall: new Gene(-250, 250),

      sensorRange: new Gene(4, 22),
      sensorThickness: new Gene(1, 4),
      random: new Gene(-250, 250),

      colorR: new Gene(0, 255),
      colorG: new Gene(0, 155),
      colorB: new Gene(0, 155)
    };

    this.GetGene = this.GetGene.bind(this);
    this.Combine = this.Combine.bind(this);
    this.Mutate = this.Mutate.bind(this);
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
        debugger
        this.genes[key].Destroy();
      });
    }
    debugger

    delete this;
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