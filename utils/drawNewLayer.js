
const drawNewLayer = (newLayer, dimensions) => {
    // Get the rows and columns from the dimensions tupple
    const [rows, cols] = dimensions

    // Assign symbols for the surrounding spaces and spaces between two parts of a brick
    const spaceSymbol = '*'
    const placeholder = ' '

    // Create an empty array of arrays with the correct number of strings in them to match the bricks numbers
    const emptyDrawing = createEmptyDrawing(rows)

    // Fill the first and last rows with space symbols
    const drawingFirstLast = fillFirstAndLast(emptyDrawing, cols, spaceSymbol)

    // Fill middle arrays with placeholder symbols
    const drawingWithMiddle = fillMiddleArrays(drawingFirstLast, cols, placeholder)

    // Fill the outer parts of the middle arrays with space symbols
    const drawingWithOuter = fillMiddleArraysOuter(drawingWithMiddle, spaceSymbol)

    // Fill numbers from the new layer to the corresponding places in the arrays
    const drawingWithNumbers = fillInNumbers(drawingWithOuter, newLayer)

    // "Surround" the numbers with the space symbols as per the task requirements.
    const finishedDrawing = fillInBrickMargins(drawingWithNumbers, spaceSymbol)

    // Join the arrays in a string to be presented to the user.
    const result = joinDrawing(finishedDrawing)

    return result
}



module.exports = drawNewLayer

// Function to create empty drawing.
function createEmptyDrawing(rows) {
    // Empty array to be filled.
    let result = []

    // Number of arrays that are needed for the row
    const rowCount = 2 * rows + 1
    for (let i = 0; i < rowCount; i++) {
        // Fill the rows with the needed number of empty arrays.
        const newArray = []
        result.push(newArray)
    }
    return result
}

// Function to fill first and last rows with space symbols.
function fillFirstAndLast(arr, cols, symbol) {
    return arr.map((x, i) => {
        // If the row is first or last fill it with arrays of 1 symbol 
        if (i === 0 || i === arr.length - 1) {
            return new Array(2 * cols + 1).fill(symbol);
        }
        return x
    })
}

// Function to fill middle rows with place holder symbols.
function fillMiddleArrays(arr, cols, symbol) {
    // If the row is not first or last fill it with arrays of 1 symbol 
    return arr.map((x, i) => {
        if (i !== 0 && i !== arr.length - 1) {
            return new Array(2 * cols + 1).fill(symbol);
        }
        return x
    })
}

// Function to fill middle rows' outer elements with space symbols.
function fillMiddleArraysOuter(arr, symbol) {
    // If the row is not first or last fill its 1st and last element with arrays of 1 symbol 
    return arr.map((x, i) => {
        if (i !== 0 && i !== arr.length - 1) {
            // Assign the 1st and last element to equal the symbol
            x[0] = symbol
            x[x.length - 1] = symbol
            return x
        }
        return x
    })
}

// Function to fill the numbers for the bricks.
function fillInNumbers(arr, bricks) {
    // Create a copy of the array from the arguments.
    const copy = arr.slice()

    // Iterate throught the bricks
    bricks.forEach(brick => {
        // For each brick asign the corresponding places to the coordinates to equal the brick's number
        copy[2 * brick.x1 - 1][2 * brick.y1 - 1] = brick.number
        copy[2 * brick.x2 - 1][2 * brick.y2 - 1] = brick.number
    })
    return copy
}

// Function to fill the brick margins and surround them with space symbols.
function fillInBrickMargins(arr, symbol) {
    // Return new arrays by modifying the arguments
    return arr.map((row, i) => {
        return row.map((el, j) => {
            // If the element el is a space string, check for conditions to "surround" the bricks with space symbol
            if (el === " ") {
                // If the bottom element and the top element are equal and are numbers => return the " " string
                if (arr[i - 1][j] === arr[i + 1][j] && typeof arr[i - 1][j] === 'number' && typeof arr[i + 1][j] === 'number') {
                    return el
                }
                // If the left element and the right element are equal and are numbers => return the " " string
                if (row[j - 1] === row[j + 1] && typeof row[j - 1] === 'number' && typeof row[j + 1] === 'number') {
                    return el
                }
                // Otherwise return the symbol from the arguments
                return symbol
            }
            return el
        })
    })
}

// Function to join the arrays in a string.
function joinDrawing(arr){
    return arr.map(x => x.join(''))
        .join('\n')
}


