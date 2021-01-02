const layerBuilder = require('./utils/layerBuilder')
const r1 = require("readline");
const helpers = require('./utils/littleHelpers');
const makeBricks = require('./utils/makeBricks');
const drawNewLayer = require('./utils/drawNewLayer');
const handleError = require('./error/errorHandler');

//Initialize the module for interaction with the console input. Read 1 line at a time.
const prompts = r1.createInterface(process.stdin, process.stdout);

// Main function that will run the application
async function start() {

    // Const to set the first message for the user.
    const dimMsg = "Enter dimensions: "

    // Const to get the first answer via the helper function
    const dimensions = await helpers.asyncQuestion(prompts, dimMsg)
    
    // Const to turn the dimensions into a tupple of two numbers
    const dimensionsArray = helpers.makeArrayOfNumbers(dimensions)

    // Check if the dimensions are as per the requirements with the areDimOK function.
    if (helpers.validators.areDimOK(dimensionsArray)) {

        // Get the rows and columns from the tupple
        const rows = dimensionsArray[0]
        const columns = dimensionsArray[1]

        // Use helper function to collect the required number of rows of numbers from the user.
        const rowsArray = await helpers.collectRowsArrays(rows, columns, prompts)

        // Use the array of numbers to make individual bricks with the makeBricks function. Array of Brick class objects.
        const bricksArr = makeBricks(rowsArray, columns)
        
        try {
            // Three functions to first create the new layer using the bricks from the base layer and the dimensions that we gathered.
            const newLayer = layerBuilder(bricksArr, dimensionsArray)
            
            // Second to draw the new layer using the drawNewLayer function as per the task specifications.
            const result = drawNewLayer(newLayer, dimensionsArray)
            
            // Third to present the result to the user
            helpers.presentResult(result);
    
            // After the result is presented we start the process all over again using recursion for another try.
            start()
        } catch (error) {
            // If there is an error in the above process we handle it and inform the user.
            handleError(error, start)
        }

    } else {
        // if the dimensions are not OK we start the process all over.
        console.log('Invalid dimensions! Please start over!');
        start()
    }
}

start()



