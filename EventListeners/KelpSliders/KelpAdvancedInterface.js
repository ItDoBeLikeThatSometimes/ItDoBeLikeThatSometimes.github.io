class KelpAdvancedInterface extends KelpBaseInterface {
    constructor() {
        super();
        this.name = "KelpAdvancedChoices";
        this.kelpAdvancedAnimation = new KelpAdvancedChoices();
        this.kelpAdvancedAnimation.initializePlots();
        this.activator = true;  // Visualization is active by default
        this.initialize();
    }

    applyVisualization() {
        this.kelpAdvancedAnimation.clearVisuals(); // Always clear the existing visuals first
        if (this.activator) {
            this.kelpAdvancedAnimation.starterPack(countryRegionData, "countryRegionData", this.sliderValue);
        }
    }
}
