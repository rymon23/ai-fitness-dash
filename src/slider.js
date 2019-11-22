
class SliderSetting {
  constructor(elementId, childId, settingKey, range = { min: null, max: null } ){
    this.elementId = elementId;
    this.childId = childId;
    this.settingKey = settingKey;
    this.element = document.getElementById(this.elementId);
    this.defaultValue = window.game.settings[this.settingKey];
    this.min = range.min ? range.min : this.element.min;
    this.max = range.max ? range.max : this.element.max;

    this.Init = this.Init.bind(this);
    this.SetDefault = this.SetDefault.bind(this);
    this.SetRange = this.SetRange.bind(this);
    this.UpdateElementValue = this.UpdateElementValue.bind(this);

    this.Init();
  }

  Init(){
    //DEFAULT VALUE
    this.SetRange(this.min, this.max);
    this.SetDefault();

    //LISTEN FOR CLICK
    this.element.addEventListener("click", () => {
      this.element.addEventListener(
        "input",
        this.UpdateElementValue(this.element.value)
      );
    });    
    
    //LISTEN FOR MOUSE OVER
    this.element.addEventListener("mousemove", () => {
      this.element.addEventListener(
        "input",
        this.UpdateElementValue(this.element.value)
      );
    });    
  }

  SetDefault(){
    this.UpdateElementValue(this.defaultValue);  
  }

  SetRange(min = null, max = null){
    debugger
    if (min && min >= 0) this.element.min = min;
    if (max && max > min){
      this.element.max = max;
    }
  }

  UpdateElementValue(newVal) {
    this.element.value = newVal;
    document.getElementById(this.childId).innerHTML = newVal;
    document.getElementById(this.childId).max
    window.game.settings[this.settingKey] = newVal;
  }
}

export default SliderSetting;