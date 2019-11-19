
class Modal {
    constructor(elementId) {
        this.elementId = elementId;
        this.element = document.getElementById(this.elementId);
        this.loader = document.getElementById("m-loader");
        this.content = document.getElementById("m-content");
        this.contentContainer = document.getElementById("m-content-container");

        this.Init = this.Init.bind(this);
        this.Disable = this.Disable.bind(this);
        this.Enable = this.Enable.bind(this);
        this.DisplayContent = this.DisplayContent.bind(this);
        this.DisplayLoader = this.DisplayLoader.bind(this);

        this.DisplayLoader();
        //this.Init()
    }

    Init(){
        this.DisplayContent();

        //DEFAULT SETTINGS
        const defaultButton = document.getElementById("settings-default-button");
        defaultButton.addEventListener("click", () => {
            window.game.ResetSliderDefaults();
        });

        //GAME START
        const startButton = document.getElementById("start-button");
        startButton.addEventListener("click", () => {
            // defaultButton = document.getElementById("settings-default-button");
            this.Disable();
            window.game.Start(false);
        });
    }

    Disable(){
        // debugger
        // this.element.style.display = "none";
        this.element.hidden = true;
    }
    Enable(displayLoader = false){
        // debugger
        // this.element.style.display = "flex";
        this.element.hidden = false;
        if (displayLoader){
            this.DisplayLoader();
        }else {
            this.DisplayContent();
        }
    }

    DisplayLoader(){
        this.content.style.display = "none";
        this.loader.style.display = "block";
        this.contentContainer.style.backgroundColor = "transparent"
    }
    DisplayContent(){
        this.loader.style.display = "none";
        this.content.style.display = "flex";
        this.contentContainer.style.backgroundColor = "rgba(97, 107, 114, 0.804)"
    }
}

export default Modal;