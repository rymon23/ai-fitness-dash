
class Modal {
    constructor(elementId) {
        this.elementId = elementId;
        this.element = document.getElementById(this.elementId);

        this.Init = this.Init.bind(this);
        this.Disable = this.Disable.bind(this);
        this.Enable = this.Enable.bind(this);

        this.Init();
    }

    Init(){
        //DEFAULT SETTINGS
        const defaultButton = document.getElementById("settings-default-button");
        defaultButton.addEventListener("click", () => {
            window.game.ResetSliderDefaults();
        });

        //GAME START
        const startButton = document.getElementById("start-button");
        startButton.addEventListener("click", () => {
             defaultButton = document.getElementById("settings-default-button");

            this.Disable();
            window.game.Start(false);
        });
    }

    Disable(){
        // debugger
        // this.element.style.display = "none";
        this.element.hidden = true;
    }

    Enable(){
        // debugger
        // this.element.style.display = "flex";
        this.element.hidden = false;
    }

}

export default Modal;