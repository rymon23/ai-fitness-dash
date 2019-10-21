
class SliderSetting {
  constructor(elementId, childId, settingKey){
    this.elementId = elementId;
    this.childId = childId;
    this.settingKey = settingKey;
    this.element = document.getElementById(this.elementId);

    this.Init = this.Init.bind(this);
    this.UpdateElementValue = this.UpdateElementValue.bind(this);

    this.Init();
  }

  Init(){
    //DEFAULT VALUE
    this.UpdateElementValue(window.game.settings[this.settingKey]);

    //LISTEN FOR CHANGE
    this.element.addEventListener("click", () => {
      this.element.addEventListener(
        "input",
        this.UpdateElementValue(this.element.value)
      );
    });    
  }

  UpdateElementValue(newVal) {
    this.element.value = newVal;
    document.getElementById(this.childId).innerHTML = newVal;
    window.game.settings[this.settingKey] = newVal;
  }
}

export default SliderSetting;