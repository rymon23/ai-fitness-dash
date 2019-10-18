import * as Util from "./util";

class Gene {
  constructor(min = -200, max = 200, value = null) {
    this.min = min;
    this.max = max;

    this.Randomize = this.Randomize.bind(this);
    this.Dup = this.Dup.bind(this);

    if (value) {
      this.value = value;
    }else {
      this.Randomize();
    }
  }

  Randomize(){
    this.value = Util.getRandomInt(this.min, this.max);
  }

  Dup(){
    return new Gene(this.min, this.max, this.value);
  }
}

export default Gene;
