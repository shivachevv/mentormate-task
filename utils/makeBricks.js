// Import the Brick class
const Brick = require("../models/Brick")

function makeBricks(rowsArray, colsCount) {
    // Variables for the bricks array and the bricks numbers encountered (so that we do not get same brick twice)
    let bricks = []
    let brickNumbers = []

    // Iterate through the rows arrays.
    rowsArray.forEach((brickRow, i) => {

        // if the row length is not equal to the columns we return false
        if (brickRow.length !== colsCount) return false

        // Const to check if this is the last row.
        const isLastRow = i === rowsArray.length - 1

        // Iterate through the row
        brickRow.forEach((number, k) => {
            // Check if the number is equal to the one in the right (row[k + 1])
            if (number === brickRow[k + 1]) {
                // Consts for row and col so that we start the coordinates from 1 and not 0.
                const row = i + 1
                const col = k + 1
                // Brick coordinates.
                const x1 = row
                const y1 = col
                const x2 = row
                const y2 = col + 1

                // New Brick instance.
                const brick = new Brick(number, x1, y1, x2, y2)

                // Check if the number has already been used by another brick (so that we do not get same brick twice.)
                if (!brickNumbers.includes(number)) bricks.push(brick)

                // Push the brick in the array of bricks
                brickNumbers.push(number)
            }

            // Check whether this is the last row
            if (!isLastRow) {

                // If not we check for vertical bricks by checking if the number is equal to the bottom one (rowsArray[i + 1][k])
                if (number === rowsArray[i + 1][k]) {
                    // Consts for row and col so that we start the coordinates from 1 and not 0.
                    const row = i + 1
                    const col = k + 1
                    // Brick coordinates
                    const x1 = row
                    const y1 = col
                    const x2 = row + 1
                    const y2 = col

                    // New Brick instance.
                    const brick = new Brick(number, x1, y1, x2, y2)

                    // Check if the number has already been used by another brick (so that we do not get same brick twice.)
                    if (!brickNumbers.includes(number)) bricks.push(brick)

                    // Push the brick in the array of bricks
                    brickNumbers.push(number)
                }
            }
        });
    });
    // Return the finished array at the end
    return bricks
}

module.exports = makeBricks