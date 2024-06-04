class DataAccumulator{

    constructor(listWithData, context){
        this.listWithData = listWithData
        this.context = context
        this.datasets = null
    }


    transformListToMap(){
        this.datasets = this.listWithData.reduce((map, name) => {
            const instance = new DataGroupToColor(this.context[name]);
            map[name] = instance
            return map;
        }, {});

        return this.datasets
    }


    getSpecificDataSet(dataToGet){
        return this.datasets[dataToGet] 
    }
}