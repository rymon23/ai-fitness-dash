import * as Util from './util';
import Gene from './gene';

class DNA {
  constructor() {
    // this.genes = []

    this.genes = {
      speed: new Gene(2, 8),
      size: new Gene(8, 18),
      seeUp: new Gene(-250, 250),
      seeDown: new Gene(-250, 250),
      seeRight: new Gene(-250, 250),
      seeLeft: new Gene(-250, 250),
      seeUpWall: new Gene(-250, 250),
      seeDownWall: new Gene(-250, 250),

      sensorRange: new Gene(8, 22),
      sensorThickness: new Gene(1,5),
      random: new Gene(-250, 250),

      colorR: new Gene(0,140),
      colorG: new Gene(0,140),
      colorB: new Gene(0,140),
    };
    // this.SetRandom();
    
    // this.SetRandom = this.SetRandom.bind(this);
    // this.SetInt = this.SetInt.bind(this);
    this.GetGene = this.GetGene.bind(this);
    this.Combine = this.Combine.bind(this);
    this.Mutate = this.Mutate.bind(this);
  }

	// SetRandom(){
  //   for (let i = 0; i < this.dnaLength; i++) {
	// 		this.genes[i] = Util.getRandomInt(-this.maxValues, this.maxValues);
  //   }
	// }
	// SetInt(pos, value){
	// 	this.genes[pos] = value;
  // }
  GetGene(geneKey){
		return this.genes[geneKey].value;
  }
	Combine(dna1, dna2){
    const geneKeys = Object.keys(this.genes);
    for (let i = 0; i < geneKeys.length; i++) {
      debugger
      this.genes[geneKeys[i]] =
        Util.getRandomInt(0, 10) < 5
          ? dna1.genes[geneKeys[i]].Dup()
          : dna2.genes[geneKeys[i]].Dup();
    }
	}
	Mutate(){
    const geneKeys = Object.keys(this.genes);
		this.genes[geneKeys[Util.getRandomInt(0, geneKeys.length - 1)]].Randomize();
  }

	// SetRandom(){
  //   for (let i = 0; i < this.dnaLength; i++) {
	// 		this.genes[i] = Util.getRandomInt(-this.maxValues, this.maxValues);
  //   }
	// }

	// SetInt(pos, value){
	// 	this.genes[pos] = value;
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