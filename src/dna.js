import * as Util from './util';
import Gene from './gene';

class DNA {
  constructor(dnaLength, maxValues) {
		this.dnaLength = dnaLength;
    this.maxValues = maxValues;
    // this.genes = []

    this.genes = {
      speed: new Gene(1, 5),
      size: new Gene(9, 13),
      senseUp: new Gene(-180, 180),
      senseDown: new Gene(-180, 180),
      senseRight: new Gene(-180, 180),
      senseLeft: new Gene(-180, 180),
      random: new Gene(-180, 180),
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