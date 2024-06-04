class KelpAdvancedAnimationChoice {
    constructor() {
        // Initialize the XYPlot instance
        const margin = { top: 40, right: 40, bottom: 60, left: 60 };
        this.container = d3.select("#svg-AdvancedKelpContainer");
        const width = +this.container.attr("width");
        const height = +this.container.attr("height");
        this.xyPlot = new XYPlot("#svg-AdvancedKelpContainer", width, height, margin);

        this.kelpChoices = new KelpAdvancedChoices(this.xyPlot);
        this.data = newData; // Make sure data2 is defined somewhere in your script

        this.newDataString = "newData"

        this.newDataInstance = accumulator.getSpecificDataSet(this.newDataString)
        this.newDataInstance.getGroupToColorMap()


        this.sliderValue = 20; // Default slider value, can be set dynamically
        this.years = this.getUniqueYears(this.data); // Extract unique years from the data
        this.currentYearIndex = 0; // Track the current year index for dynamic updates
        this.isAnimating = false; // Track whether the animation is running
        this.animationTimeout = null; // Store the timeout ID for the animation

        // Set initial domains based on your data
        const xDomain = [0, d3.max(this.data, d => d.x)]; // Ensure no negative values
        const yDomain = [0, d3.max(this.data, d => d.y)]; // Ensure no negative values
        this.xyPlot.setDomains(xDomain, yDomain);
        this.xyPlot.renderAxes();

        // Add a text element for displaying the year
        this.yearLabel = this.xyPlot.svg.append("text")
            .attr("x", width - 10) // Position near the right edge
            .attr("y", 20) // Position near the top edge
            .attr("class", "YearText") // Apply the professional styling
            .text(this.years[this.currentYearIndex]); // Set initial year

        this.animationSpeed = 1000; // Default speed (1 second)

        
    }

    setAnimationSpeed(speed) {
        switch (speed) {
            case 'Slow':
                this.animationSpeed = 1500;
                break;
            case 'Medium':
                this.animationSpeed = 1000;
                break;
            case 'Fast':
                this.animationSpeed = 100;
                break;
            default:
                this.animationSpeed = 100;
        }
    }

    getUniqueYears(data) {
        const years = new Set(data.map(d => d.year));
        return Array.from(years).sort((a, b) => a - b);
    }

    startAnimation() {
        this.isAnimating = true;
        this.animateCircles();
    }

    stopAnimation() {
        this.isAnimating = false;
        clearTimeout(this.animationTimeout); // Stop the animation
    }

    animateCircles() {
        if (!this.isAnimating) return;

        const animateYear = () => {
            if (!this.isAnimating) return; // Check again in case the animation was stopped

            const currentYear = this.years[this.currentYearIndex];
            const nextYear = this.years[(this.currentYearIndex + 1) % this.years.length];

            const currentData = this.data.filter(d => d.year === currentYear);
            const nextData = this.data.filter(d => d.year === nextYear);

            const intermediateStates = this.getIntermediateStates(currentData, nextData, 100); // Adjust the number of steps as needed

            this.iterateIntermediateStates(intermediateStates, 0, () => {
                this.currentYearIndex = (this.currentYearIndex + 1) % this.years.length;
                // Update the year label
                this.yearLabel.text(this.years[this.currentYearIndex]);

                // Check if we've looped back to the initial year and stop the animation if true
                if (this.currentYearIndex === 0) {
                    this.stopAnimation();
                } else {
                    this.animationTimeout = setTimeout(animateYear, this.animationSpeed); // Adjust the duration based on speed
                }
            });
        };
        animateYear();
    }

    getIntermediateStates(currentData, nextData, steps) {
        const intermediateStates = [];

        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const intermediateData = currentData.map((d, index) => {
                const nextDatum = nextData.find(n => n.country === d.country);
                if (nextDatum) {
                    return {
                        ...d,
                        x: d.x * (1 - t) + nextDatum.x * t,
                        y: d.y * (1 - t) + nextDatum.y * t,
                        color: d.color
                    };
                }
                return d;
            });
            intermediateStates.push(intermediateData);
        }

        return intermediateStates;
    }

    iterateIntermediateStates(states, index, onComplete) {
        if (!this.isAnimating || index >= states.length) {
            onComplete();
            return;
        }

        this.updateCirclesAndPaths(states[index], states[index]);

        setTimeout(() => {
            this.iterateIntermediateStates(states, index + 1, onComplete);
        }, this.animationSpeed / states.length); // Adjust the duration as needed
    }

    updateCirclesAndPaths(currentData, nextData) {
        const self = this;
    
        // Update circles
        const circles = this.xyPlot.plotArea.selectAll("circle.main")
            .data(nextData, d => d.country);
    
        // Enter selection: append new circles for new data points
        const enterCircles = circles.enter()
            .append("circle")
            .attr("class", "main")
            .attr("r", 5) // hard coded
            .attr("data-group", d => d.group)
            .attr("fill",  function(d) {
                const group = d.group; // First, assign the group to a variable
                const color = self.newDataInstance.returnColorfromGroupMap(group)
                if (!color) {
                    console.error('groupElement is undefined or not in colorGroup:', group);
                }
                return color;
            })
            .attr("cx", d => this.xyPlot.xScale(d.x))
            .attr("cy", d => this.xyPlot.yScale(d.y))
            .attr("id", (d, i) => i)
            .attr("hullID", d => d.country + d.country)
            .attr("country", d => d.country);
            
    
        // Update selection: update existing circles
        // const mergedCircles = enterCircles.merge(circles)
        //     .attr("cx", d => this.xyPlot.xScale(d.x))
        //     .attr("cy", d => this.xyPlot.yScale(d.y));
    
        // Function to update paths
        function updatePaths(data) {
            self.kelpChoices.clearVisuals(); // Clear previous visuals
            self.kelpChoices.updatePlots(data, self.newDataString);
    
            const lithWithPaths = self.kelpChoices.shortestPathCalculator();
    
            if (!lithWithPaths || lithWithPaths.length === 0) {
                console.error("lithWithPaths is empty or undefined");
                return;
            }
    
            const deletedPaths = self.kelpChoices.drawConvexHulls(self.sliderValue, lithWithPaths, self.container);


            
            const listWithGroups = self.kelpChoices.creatingAListWithAvailableGroups(self.container);
            for (let i = 0; i < listWithGroups.length; i++) {
                //console.log("Checking listWithGroups[i] ", listWithGroups[i] )
                const groupMappedToSpecificColor = self.newDataInstance.returnColorfromGroupMap(listWithGroups[i])
                self.kelpChoices.blobbyPathCreator(deletedPaths, groupMappedToSpecificColor);
            }
        }
    
        // Update the paths during the transition
        updatePaths(nextData);
    
        // Exit selection: remove circles that are no longer in the data
        circles.exit().remove();
    }
    

    starterPack(sliderDistance) {
        this.sliderValue = sliderDistance; // Update the slider value dynamically
        const year = this.years[this.currentYearIndex]; // Use the current year index
        this.kelpChoices.updatePlots((this.data.filter(d => d.year === year)), this.newDataString);
        const lithWithPaths = this.kelpChoices.shortestPathCalculator();
        

        //console.log("Nodes:", this.kelpChoices.data); // Debug nodes
        //console.log("Calculated paths:", lithWithPaths); // Debug paths
        if (!lithWithPaths || lithWithPaths.length === 0) {
            console.error("lithWithPaths is empty or undefined");
            return;
        }
        this.drawConvexHulls(this.sliderValue, lithWithPaths, this.container);
    }

    drawConvexHulls(sliderDistance, data) {
        this.sliderValue = sliderDistance; // Update the slider value dynamically
        const lithWithPaths = this.kelpChoices.shortestPathCalculator();
        //console.log("Nodes:", this.kelpChoices.data); // Debug nodes
        //console.log("Calculated paths:", lithWithPaths); // Debug paths
        if (!lithWithPaths || lithWithPaths.length === 0) {
            console.error("lithWithPaths is empty or undefined");
            return;
        }
        const deletedPaths = this.kelpChoices.drawConvexHulls(sliderDistance, lithWithPaths, this.container);
        //console.log("Deleted paths:", deletedPaths); // Debug deleted paths

        const listWithGroups = this.kelpChoices.creatingAListWithAvailableGroups(this.container);
        for (let i = 0; i < listWithGroups.length; i++) {
            //console.log("Checking listWithGroups[i] ", listWithGroups[i] )
            //console.log("Checking type of listWithGroups[i] ", typeof listWithGroups[i])
            const groupMappedToSpecificColor = this.newDataInstance.returnColorfromGroupMap(listWithGroups[i])
            //console.log("Checking what groupMappedToSpecificColor is ", groupMappedToSpecificColor)
            this.kelpChoices.blobbyPathCreator(deletedPaths, groupMappedToSpecificColor);
        }
    }

    updateHullForCurrentYear() {
        // Update the hull for the current year based on the current slider value
        const currentYear = this.years[this.currentYearIndex];
        const currentData = this.data.filter(d => d.year === currentYear);
        this.kelpChoices.clearVisuals(); // Clear previous visuals
        this.kelpChoices.updatePlots(currentData, this.newDataString);
        this.drawConvexHulls(this.sliderValue, currentData); // Redraw with updated slider value
    }

    clearVisuals() {
        this.kelpChoices.clearVisuals();
    }

    
}