const layerBuilder = require('./utils/layerBuilder')
const r1 = require("readline");
const helpers = require('./utils/littleHelpers');
const makeBricks = require('./utils/makeBricks');
const drawNewLayer = require('./utils/drawNewLayer');
const handleError = require('./error/errorHandler');

const prompts = r1.createInterface(process.stdin, process.stdout);


async function start() {
    const dimMsg = "Enter dimensions: "
    const dimensions = await helpers.asyncQuestion(prompts, dimMsg)
    const dimensionsArray = helpers.makeArrayOfNumbers(dimensions)

    if (helpers.validators.areDimOK(dimensionsArray)) {
        const rows = dimensionsArray[0]
        const columns = dimensionsArray[1]
        const rowsArray = await helpers.collectRowsArrays(rows, columns, prompts)
        const bricksArr = makeBricks(rowsArray, columns)
        
        try {
            const newLayer = layerBuilder(bricksArr, dimensionsArray)
            const result = drawNewLayer(newLayer, dimensionsArray)
            helpers.presentResult(result);
    
            start()
        } catch (error) {
            handleError(error, start)
        }

    } else {
        console.log('Invalid dimensions! Please start over!');
        start()
    }
}

start()



