var dataListingHardCoded = ["countryRegionData", "data", "data2", "newData"]

var contextHardCoded = {countryRegionData, data, data2, newData}

const accumulator = new DataAccumulator(dataListingHardCoded, contextHardCoded)

accumulator.transformListToMap()




// //Test> get grouping to color map for data2
// const newDataInstance = accumulator.getSpecificDataSet('newData')
// console.log("newDataInstance groupToColorMap ", newDataInstance.getGroupToColorMap())

// const newDataInstance2 = accumulator.getSpecificDataSet('newData')
// console.log("newDataInstance groupToColorMap ", newDataInstance2.getGroupToColorMap())

// const newDataInstance5 = accumulator.getSpecificDataSet('newData')
// console.log("newDataInstance groupToColorMap ", newDataInstance5.getGroupToColorMap())

// //Test> Making an instance for newData and find color for group "WesternEurope":
// const colorForGroupWesternEurope = newDataInstance.returnColorfromGroupMap("WesternEurope")
// console.log("color for group WesternEurope from newData is ", colorForGroupWesternEurope)