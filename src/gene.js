import * as Util from "./util";
import Form from "./form";

class Gene extends Form{
  constructor(min = -250, max = 250, value = null) {
    super();
    this.min = min;
    this.max = max;
    this.value = value;
    // this.min = (min instanceof Array)?
    //   Util.getRandomInt(min[0], min[1])
    //   : min;
    // this.max = (max instanceof Array)?
    //   Util.getRandomInt(max[0], max[1])
    //   : max;
    this.Randomize = this.Randomize.bind(this);
    this.Dup = this.Dup.bind(this);   

    if (this.value === null) {
      this.Randomize();
    }
    // debugger
  }

  Randomize(){
    this.value = Util.getRandomInt(this.min, this.max);
  }
  Dup(){
    return new Gene(this.min, this.max, this.value);
  }
}

export default Gene;
