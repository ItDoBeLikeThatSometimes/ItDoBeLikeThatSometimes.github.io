class XYPlot {
    constructor(container, width, height, margin) {
        this.container = d3.select(container);
        this.width = width - margin.left - margin.right;
        this.height = height - margin.top - margin.bottom;
        this.margin = margin;

        // Create the main SVG container
        this.svg = this.container.append("svg")
            .attr("width", width)
            .attr("height", height);

        // Create a group within the SVG container for the plot area
        this.plotArea = this.svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        this.xScale = d3.scaleLinear().range([0, this.width]);
        this.yScale = d3.scaleLinear().range([this.height, 0]);

        this.xAxis = d3.axisBottom(this.xScale);
        this.yAxis = d3.axisLeft(this.yScale);
    }

    setDomains(xDomain, yDomain) {
        this.xScale.domain(xDomain);
        this.yScale.domain(yDomain);
        console.log('xScale domain:', this.xScale.domain());
        console.log('yScale domain:', this.yScale.domain());
    }

    renderAxes() {
        // Append X axis
        this.plotArea.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0,${this.height})`)
            .call(this.xAxis);

        // Append Y axis
        this.plotArea.append("g")
            .attr("class", "y axis")
            .call(this.yAxis);

        // Call the method to add grid lines
        this.addGridLines();
    }

    addGridLines() {
        // Add X grid lines
        this.plotArea.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(0,${this.height})`)
            .call(d3.axisBottom(this.xScale)
                .ticks(10)
                .tickSize(-this.height)
                .tickFormat(""));

        // Add Y grid lines
        this.plotArea.append("g")
            .attr("class", "grid")
            .call(d3.axisLeft(this.yScale)
                .ticks(10)
                .tickSize(-this.width)
                .tickFormat(""));
    }

    addLabels(xLabel, yLabel){
        this.svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", this.margin.left + this.width)
            .attr("y", this.margin.top + this.height + this.margin.bottom - 10)
            .text(xLabel);


        this.svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", this.margin.top - 40)
            .attr("x", -this.margin.top)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text(yLabel);
    }

}

