class DataGroupToColor {
    constructor(data) {
        this.data = data;
        this.groupToColorMap = null;
        this.colorSchemes = {
            bright: ["#4477AA", "#66CCEE", "#228833", "#CCBB44", "#EE6677", "#AA3377", "#BBBBBB"],
            highContrast: ["#004488", "#DDAA33", "#BB5566"],
            vibrant: ["#EE7733", "#0077BB", "#33BBEE", "#009988", "#EE3377", "#BBBBBB"],
            muted: ["#332288", "#88CCEE", "#44AA99", "#117733", "#999933", "#DDCC77", "#CC6677", "#882255", "#AA4499", "#DDDDDD"],
            mediumContrast: ["#6699CC", "#004488", "#997700", "#994455", "#004488"]
        };
        this.selectedScheme = this.colorSchemes.vibrant; // Default scheme
    }

    creategroupToColorMap() {
        const listWithGroups = Array.from(new Set(this.data.map(item => item.group)));
        
        // If there are more groups than colors, we cycle through the colors
        const colorsLibrary = [...this.selectedScheme];
        
        const listWithColors = listWithGroups.map((_, index) => this.getItemAndCycle(colorsLibrary, index));
        
        // Create a map to associate groups with colors
        const groupToColorMap = {};
        for (let i = 0; i < listWithGroups.length; i++) {
            groupToColorMap[listWithGroups[i]] = listWithColors[i];
        }
        
        return groupToColorMap;
    }

    returnColorfromGroupMap(groupElement) {
        if (!groupElement || !this.groupToColorMap.hasOwnProperty(groupElement)) {
            console.error('groupElement is undefined or not in colorGroup:', groupElement);
            return 'defaultColor'; // or some default color
        }
        return this.groupToColorMap[groupElement];
    }

    getItemAndCycle(arr, index) {
        // Cycle through the colors if there are more groups than colors
        return arr[index % arr.length];
    }

    getGroupToColorMap() {
        if (this.groupToColorMap === null) {
            this.groupToColorMap = this.creategroupToColorMap();
        }
        return this.groupToColorMap;
    }

    setColorScheme(scheme) {
        if (this.colorSchemes.hasOwnProperty(scheme)) {
            this.selectedScheme = this.colorSchemes[scheme];
        } else {
            console.error('Invalid color scheme. Available schemes:', Object.keys(this.colorSchemes));
        }
    }
}

// // Example usage
// const data = [
//     { group: 'A', value: 10 },
//     { group: 'B', value: 20 },
//     { group: 'C', value: 30 },
//     { group: 'D', value: 40 },
//     { group: 'E', value: 50 }
// ];

// const colorMapper = new DataGroupToColor(data);
// colorMapper.setColorScheme('bright');
// const groupToColorMap = colorMapper.getGroupToColorMap();

// console.log(groupToColorMap);  // Logs the map of groups to colors based on the bright scheme
// console.log(colorMapper.returnColorfromGroupMap('A'));  // Should return the color for group 'A'
