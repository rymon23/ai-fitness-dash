
class SliderSetting {
  constructor(elementId, childId, settingKey){
    this.elementId = elementId;
    this.childId = childId;
    this.settingKey = settingKey;
    this.element = document.getElementById(this.elementId);
    this.defaultValue = window.game.settings[this.settingKey];

    this.Init = this.Init.bind(this);
    this.SetDefault = this.SetDefault.bind(this);
    this.UpdateElementValue = this.UpdateElementValue.bind(this);

    this.Init();
  }

  Init(){
    //DEFAULT VALUE
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

  UpdateElementValue(newVal) {
    this.element.value = newVal;
    document.getElementById(this.childId).innerHTML = newVal;
    window.game.settings[this.settingKey] = newVal;
  }
}

export default SliderSetting;