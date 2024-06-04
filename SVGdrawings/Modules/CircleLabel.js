class CircleLabel {
    constructor(container) {
        this.container = container;
        this.label = null;
    }

    createLabel() {
        this.label = this.container.append("text")
            .attr("class", "circle-label")
            .style("opacity", 0)
            .attr("text-anchor", "end")
            .attr("x", -10) // Offset to the left of the circle
            .attr("dy", "0.35em"); // Center vertically
    }

    showLabel(circle, country) {
        if (!this.label) {
            this.createLabel();
        }

        this.label.text(country)
            .attr("x", parseFloat(circle.attr("cx")) - 10)
            .attr("y", parseFloat(circle.attr("cy")))
            .style("opacity", 1);
    }

    hideLabel() {
        if (this.label) {
            this.label.style("opacity", 0);
        }
    }

    updateLabelPosition(circle) {
        if (this.label && this.label.style("opacity") == 1) {
            this.label.attr("x", parseFloat(circle.attr("cx")) - 10)
                .attr("y", parseFloat(circle.attr("cy")));
        }
    }
}
