const makeBricks = require("./makeBricks")

// Gather the functions into an object and export it for use in other files.
const helpers = {
    makeArrayOfNumbers,
    validators: {
        areDimOK,
        areRowsOK
    },
    asyncQuestion,
    collectRowsArrays,
    presentResult
}

module.exports = helpers

// Function to split a string into numbers.
function makeArrayOfNumbers(input) {
    return input
        .trim()
        .split(' ')
        .map(x => Number(x))
}

// Get the user input with this function. Because readline is async, we wrap it in a promise and make it sync with async/await
async function asyncQuestion(prompts, msg) {
    return await new Promise(resolve => {
        prompts.question(msg, answer => resolve(answer))
    })
}

// Function to collect the brick rows and return them as an array
async function collectRowsArrays(rowsNumber, colsNumber, prompts) {
    // Empty array to be returned after it is filled.
    let rowsArray = []

    // Iterate through the rows we get from the dimensions and for each row we collect brick numbers from the user.
    for (let i = 1; i <= rowsNumber; i++) {
        // Create message, ask the user a question for the numbers and get them in the row constant.
        const rowMsg = `Enter brick layer 1 row ${i}: `
        const row = await helpers.asyncQuestion(prompts, rowMsg)

        // Make an array from the user answer and store it in the array rowsArray
        const brickLayerArr = helpers.makeArrayOfNumbers(row)
        rowsArray.push(brickLayerArr)
    }

    // Check if the rows meet the task requirements.
    if (!helpers.validators.areRowsOK(rowsArray, rowsNumber, colsNumber)) {
        // If not user recursion to start the function again so that the user can enter valid rows.
        console.log('Invalid rows! Please start over!');
        return await collectRowsArrays(rowsNumber, colsNumber, prompts)
    }

    // At the end return the rows array filled with the number rows in the layer.
    return rowsArray
}

// Function to check if the rows meet the requirements.
function areRowsOK(rows, rowsNumber, colsNumber) {

    // If the rows array is not as long as the number of rows return false
    if (rows.length !== rowsNumber) return false

    // Use makeBricks function to create an object for each brick using the Brick class
    const bricks = makeBricks(rows, colsNumber)

    // Calculate the area of the layer
    const layerArea = rowsNumber * colsNumber

    // Calculate the area of the constructed bricks
    const brickArea = bricks.length * 2

    // Check if the bricks do not match the area of the layer and return false
    if (brickArea !== layerArea) return false

    // Return true if all is OK
    return true
}

// Function to check if the dimensions are OK 
function areDimOK(input) {
    // Get the dimensions length
    const dimLength = input.length

    // Filter the array for any dimensions that do not meet the requirements.
    const filteredDimLength = input
        .filter(x => {
            // Only even numbers bellow 100 are OK
            if (x % 2 === 0 && x <= 100) {
                return x
            }
        }).length

    //If the length and filtered dimensions length match and is equal to 2 we return true
    if (dimLength === filteredDimLength && dimLength === 2) return true

    // in the other case => false
    else return false
}

// function to present the result in the console to the user.
function presentResult(result) {
    return console.log(result);
}