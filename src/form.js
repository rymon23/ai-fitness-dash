
class Form {
  constructor() {
    this.tags = [];

    //BINDS
    this.HasTag = this.HasTag.bind(this);
    this.HasShape = this.HasShape.bind(this);
    this.StopUpdate = this.StopUpdate.bind(this);
    this.Destroy = this.Destroy.bind(this);
    this.Resize = this.Resize.bind(this);
  }

  HasShape(shape) {
    return this.shape === shape;
  }
  HasTag(tag) {
    return this.tags.includes(tag);
  }
  StopUpdate() {
    //OVERRIDDEN BY CHILD
  }
  Destroy() {
    this.StopUpdate();
    delete this;
  }
  Resize(){
    //OVERRIDDEN BY CHILD
  }
}

export default Form;