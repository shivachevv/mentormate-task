const Brick = require("../models/Brick")

function makeBricks(rowsArray, colsCount) {
    let bricks = []
    let brickNumbers = []
    rowsArray.forEach((row, i) => {
        if (row.length !== colsCount) return false
        const isLastRow = i === rowsArray.length - 1

        row.forEach((number, k) => {
            if (number === row[k + 1]) {
                const row = i + 1
                const col = k + 1
                const x1 = row
                const y1 = col
                const x2 = row
                const y2 = col + 1
                const brick = new Brick(number, x1, y1, x2, y2)
                if (!brickNumbers.includes(number)) bricks.push(brick)
                brickNumbers.push(number)
            }
            if (!isLastRow) {
                if (number === rowsArray[i + 1][k]) {
                    const row = i + 1
                    const col = k + 1
                    const x1 = row
                    const y1 = col
                    const x2 = row + 1
                    const y2 = col
                    const brick = new Brick(number, x1, y1, x2, y2)
                    if (!brickNumbers.includes(number)) bricks.push(brick)
                    brickNumbers.push(number)
                }
                if (rowsArray[i + 1][k] === rowsArray[i + 1][k + 1]) {
                    const newNumber = rowsArray[i + 1][k]
                    const row = i + 2
                    const col = k + 1
                    const x1 = row
                    const y1 = col
                    const x2 = row
                    const y2 = col + 1
                    const brick = new Brick(newNumber, x1, y1, x2, y2)
                    if (!brickNumbers.includes(rowsArray[i + 1][k])) bricks.push(brick)
                    brickNumbers.push(newNumber)
                }
            }
        });
    });
    return bricks
}

module.exports = makeBricks