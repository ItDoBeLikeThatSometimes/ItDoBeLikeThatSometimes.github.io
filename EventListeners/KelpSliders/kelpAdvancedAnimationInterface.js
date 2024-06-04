class KelpAdvancedAnimationInterface extends KelpBaseInterface {
    constructor() {
        super();
        this.name = "KelpAdvancedAnimation";
        this.kelpAdvancedAnimation = new KelpAdvancedAnimationChoice();

        this.speedButton = new SpeedButton();
        this.speedButton.settingSpeed();
        
        // Attach an event listener to the button to start/stop the animation
        const startAnimationButton = document.getElementById("startAnimationButton");
        startAnimationButton.addEventListener("click", () => {
            const selectedSpeed = this.speedButton.getSelectedSpeed();
            if (selectedSpeed) {
                this.kelpAdvancedAnimation.setAnimationSpeed(selectedSpeed);
            }
            if (this.kelpAdvancedAnimation.isAnimating) {
                this.kelpAdvancedAnimation.stopAnimation();
                startAnimationButton.textContent = "Start Animation";
            } else {
                this.kelpAdvancedAnimation.startAnimation();
                startAnimationButton.textContent = "Stop Animation";
            }
        });

        this.activator = true;  // Visualization is active by default
        this.initialize();
    }

    applyVisualization() {
        this.kelpAdvancedAnimation.clearVisuals(); // Always clear the existing visuals first
        if (this.activator) {
            this.kelpAdvancedAnimation.starterPack(this.sliderValue);
        }
    }

    setupSlider() {
        const slider = document.getElementById('maxDistanceSlider');
        slider.addEventListener('input', () => {
            this.sliderValue = this.getSliderValue();
            this.kelpAdvancedAnimation.sliderValue = this.sliderValue; // Update the slider value in KelpAdvancedAnimationChoice
            this.kelpAdvancedAnimation.updateHullForCurrentYear(); // Update the hull dynamically
        });
    }
}
