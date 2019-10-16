import * as Util from './util';

class DNA {
  constructor(dnaLength, maxValues) {
		this.dnaLength = dnaLength;
    this.maxValues = maxValues;
    this.genes = []
    this.SetRandom();
    
    this.SetRandom = this.SetRandom.bind(this);
    this.SetInt = this.SetInt.bind(this);
    this.GetGene = this.GetGene.bind(this);
    this.Combine = this.Combine.bind(this);
    this.Mutate = this.Mutate.bind(this);
  }

	SetRandom(){
    for (let i = 0; i < this.dnaLength; i++) {
			this.genes[i] = Util.getRandomInt(-this.maxValues, this.maxValues);
    }
	}

	SetInt(pos, value){
		this.genes[pos] = value;
  }
  
  GetGene(pos){
		return this.genes[pos];
  }
  
	Combine(dna1, dna2){
    for (let i = 0; i < this.dnaLength; i++) {
			this.genes[i] = Util.getRandomInt(0, 10) < 5 ? dna1.genes[i] : dna2.genes[i];
    }
	}

	Mutate(){
		this.genes[Util.getRandomInt(0, this.dnaLength - 1)] = Util.getRandomInt(-this.maxValues, this.maxValues);
  }
}

export default DNA;