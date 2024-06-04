class KelpBaseInterface {
    constructor() {
        this.sliderValue = null;
        this.activator = true; // Visualization is active by default
    }

    initialize() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupSlider();
            this.sliderValue = this.getSliderValue(); // Get initial slider value
            this.applyVisualization(); // Apply initial visual settings
        });
    }

    setupSlider() {
        const slider = document.getElementById('maxDistanceSlider');
        slider.addEventListener('input', () => {
            this.sliderValue = this.getSliderValue();
            this.applyVisualization(); // Clear and update visualization based on slider input
        });
    }

    getSliderValue() {
        var slider = document.getElementById('maxDistanceSlider');
        var value = parseInt(slider.value, 10); // Convert to integer
        document.getElementById('maxDistanceValue').innerText = 'Slider Value (distance): ' + value; // Update display
        return value; // Return the numeric value
    }

    applyVisualization() {
        // This method should be overridden by subclasses
        throw new Error("applyVisualization() must be overridden in the subclass");
    }

    toggleVisuals() {
        // This method toggles whether visuals should be applied or not
        this.activator = !this.activator;
        this.applyVisualization();
    }
}