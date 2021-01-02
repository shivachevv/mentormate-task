
const drawNewLayer = (newLayer, dimensions) => {
    const [rows, cols] = dimensions
    const spaceSymbol = '*'
    const placeholder = ' '
    const emptyDrawing = createEmptyDrawing(rows)
    const drawingFirstLast = fillFirstAndLast(emptyDrawing, cols, spaceSymbol)
    const drawingWithMiddle = fillMiddleArrays(drawingFirstLast, cols, placeholder)
    const drawingWithOuter = fillMiddleArraysOuter(drawingWithMiddle, spaceSymbol)
    const drawingWithNumbers = fillInNumbers(drawingWithOuter, newLayer)
    const finishedDrawing = fillInBrickMargins(drawingWithNumbers, spaceSymbol)
    const result = joinDrawing(finishedDrawing)

    return result
}



module.exports = drawNewLayer

function createEmptyDrawing(rows) {
    let result = []
    const rowCount = 2 * rows + 1
    for (let i = 0; i < rowCount; i++) {
        const newArray = []
        result.push(newArray)
    }
    return result
}

function fillFirstAndLast(arr, cols, symbol) {
    return arr.map((x, i) => {
        if (i === 0 || i === arr.length - 1) {
            return new Array(2 * cols + 1).fill(symbol);
        }
        return x
    })
}

function fillMiddleArrays(arr, cols, symbol) {
    return arr.map((x, i) => {
        if (i !== 0 && i !== arr.length - 1) {
            return new Array(2 * cols + 1).fill(symbol);
        }
        return x
    })
}

function fillMiddleArraysOuter(arr, symbol) {
    return arr.map((x, i) => {
        if (i !== 0 && i !== arr.length - 1) {
            x[0] = symbol
            x[x.length - 1] = symbol
            return x
        }
        return x
    })
}

function fillInNumbers(arr, bricks) {
    const copy = arr.slice()
    bricks.forEach(brick => {
        copy[2 * brick.x1 - 1][2 * brick.y1 - 1] = brick.number
        copy[2 * brick.x2 - 1][2 * brick.y2 - 1] = brick.number
    })
    return copy
}

function fillInBrickMargins(arr, symbol) {
    return arr.map((row, i) => {
        return row.map((el, j) => {
            if (el === " ") {
                if (arr[i - 1][j] === arr[i + 1][j] && typeof arr[i - 1][j] === 'number' && typeof arr[i + 1][j] === 'number') {
                    return el
                }
                if (row[j - 1] === row[j + 1] && typeof row[j - 1] === 'number' && typeof row[j + 1] === 'number') {
                    return el
                }
                return symbol
            }
            return el
        })
    })
}

function joinDrawing(arr){
    return arr.map(x => x.join(''))
        .join('\n')
}


