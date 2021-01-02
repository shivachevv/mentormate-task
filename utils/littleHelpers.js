const makeBricks = require("./makeBricks")

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

function makeArrayOfNumbers(input) {
    return input
        .trim()
        .split(' ')
        .map(x => Number(x))
}


async function asyncQuestion(prompts, msg) {
    return await new Promise(resolve => {
        prompts.question(msg, answer => resolve(answer))
    })
}

async function collectRowsArrays(rowsNumber, colsNumber, prompts) {
    let rowsArray = []
    for (let i = 1; i <= rowsNumber; i++) {
        const rowMsg = `Enter brick layer 1 row ${i}: `
        const row = await helpers.asyncQuestion(prompts, rowMsg)

        const brickLayerArr = helpers.makeArrayOfNumbers(row)
        rowsArray.push(brickLayerArr)
    }

    if (!helpers.validators.areRowsOK(rowsArray, rowsNumber, colsNumber)) {
        console.log('Invalid rows! Please start over!');
        return await collectRowsArrays(rowsNumber, colsNumber, prompts)
    }

    return rowsArray
}

function areRowsOK(rows, rowsNumber, colsNumber) {

    if (rows.length !== rowsNumber) return false
    const bricks = makeBricks(rows, colsNumber)
    const layerArea = rowsNumber * colsNumber
    const brickArea = bricks.length * 2

    if (brickArea !== layerArea) return false

    return true
}

function areDimOK(input) {
    const dimLength = input.length
    const filteredDimLength = input
        .filter(x => {
            if (x % 2 === 0 && x <= 100) {
                return x
            }
        }).length
    if (dimLength === filteredDimLength && dimLength === 2) return true
    else return false
}

function presentResult(result){
    return console.log(result);
}