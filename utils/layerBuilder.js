const Brick = require("../models/Brick")

// Function to make the second layer of bricks
const layerBuilder = (baseLayer, dimensions) => {
    // A copy of the original base layer (we use map with making of new instance for each brick so that we can keep the methods in the objects)
    const brickStack = baseLayer.map(x => new Brick(x.number, x.x1, x.y1, x.x2, x.y2))

    // Empty new layer array
    const newLayer = []
    // Get the dimensions from the tupple
    const [rows, cols] = dimensions

    // Iterate through the rows and columns so that we get every coordinate.
    for (let i = 1; i <= rows; i++) {

        // Iterate through the rows and columns so that we get every coordinate.
        for (let j = 1; j <= cols; j++) {

            // Get the coordinates x,y 
            const x = i
            const y = j

            // Check if the spot is free in the new layer 
            if (isSpotFree("current", x, y, newLayer)) {
                // Get the brick that occupies the spot in the base layer (the function returns an object of the brick and the part of it that
                // is in this spot: 1 or 2)
                const baseBrick = isThereBaseBrick(x, y, baseLayer)

                // Get a new brick from the stack
                const newBrick = brickStack.shift()

                // Check if the last brick in the base layer is vertical, if the column is 2nd and if the last two are not vertical 
                // (so that we avoid cases where bricks do not align well)
                if (y === 2 && isLastBrickVertical(baseLayer, cols, x) && !areLastTwoVertical(baseLayer, cols, x)) {
                    // If true we place a vertical brick
                    newBrick.placeVertically(x, y)
                    // Push the new brick in the new player
                    newLayer.push(newBrick)

                    // Check if the column is the second to last and the last two bricks in the base layer are vertical
                } else if (y === cols - 2 && areLastTwoVertical(baseLayer, cols, x)) {
                    // if true push a new vertical brick in the new layer
                    newBrick.placeVertically(x, y)
                    newLayer.push(newBrick)

                    // If non of the above apply we check for another conditions.
                } else {

                    // If the spot is the 1st part of a brick in the base layer
                    if (baseBrick.part && baseBrick.part === 1) {

                        // If the brick is horizontal
                        if (isBrickHorizontal(baseBrick.brick)) {
                            // Place new vertical brick and push it in the new layer
                            newBrick.placeVertically(x, y)
                            newLayer.push(newBrick)
                        } else {
                            // If the brick is vertical we check if the spot on the right to it is free and we place a horizontal brick if it is,
                            // and vertical one if it is not
                            if (isSpotFree("right", x, y, newLayer)) {
                                newBrick.placeHorizontally(x, y)
                                newLayer.push(newBrick)
                            } else {
                                newBrick.placeVertically(x, y)
                                newLayer.push(newBrick)
                            }
                        }
                    }
                    // Check if this is the 2nd part of a base brick
                    if (baseBrick.part && baseBrick.part === 2) {

                        // If this is the last spot of the row we place a vertical brick in the new layer
                        if (isFieldLast(cols, y)) {
                            newBrick.placeVertically(x, y)
                            newLayer.push(newBrick)
                        } else {
                            // If the row is before the last we place the brick vertically
                            if (isRowBeforeLast(rows, x)) {
                                newBrick.placeVertically(x, y)
                                newLayer.push(newBrick)
                            } else {
                                // If it is not the last spor we check if the spot on the right is free and place a horizontal brick if it is
                                // and vertical one if it is not
                                if (isSpotFree("right", x, y, newLayer)) {
                                    newBrick.placeHorizontally(x, y)
                                    newLayer.push(newBrick)
                                } else {
                                    newBrick.placeVertically(x, y)
                                    newLayer.push(newBrick)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return newLayer
}

module.exports = layerBuilder

// Function to check if a spot is free
function isSpotFree(type, x1, y1, newLayer) {
    // Object to distinguish which spot is required to be checked
    const map = {
        "current": {
            x: x1,
            y: y1
        },
        "right": {
            x: x1,
            y: y1 + 1
        },
        "bottom": {
            x: x1 + 1,
            y: y1
        },
        "up": {
            x: x1 - 1,
            y: y1
        },
        "left": {
            x: x1,
            y: y1 - 1
        }
    }

    // If there are no bricks in the new layer yet, we return true
    if (newLayer.length === 0) return true

    // We filter the new layer and check whether its new length is a thruty value.
    // If it is other then 0 we return false because the spot is not free
    return !newLayer.filter(newBrick => {
        // Checks if there is such brick in the new layer with coordinates that match the given by the function arguments.
        if (newBrick.x1 === map[type].x && newBrick.y1 === map[type].y) {
            return newBrick
        }
        // We check the second coordinates of the brick as well (x2 and y2)
        if (newBrick.x2 === map[type].x && newBrick.y2 === map[type].y) {
            return newBrick
        }
    }).length
}

// Function to calculate if there is a brick on the spot from the base layer
function isThereBaseBrick(x1, y1, baseLayer) {
    // The result is an object with the part of the brick that is in this spot and the brick itself
    let result = {
        part: 0,
        brick: undefined
    }

    // Iterate through the bricks and if a one matches the coordinates we add it to the result object
    baseLayer.forEach(brick => {
        if (brick.x1 === x1 && brick.y1 === y1) {
            result.part = 1
            result.brick = brick
        }
        if (brick.x2 === x1 && brick.y2 === y1) {
            result.part = 2
            result.brick = brick
        }
    })
    return result
}

// Function to check if the brick is horizontal
function isBrickHorizontal(brick) {
    // If x1 === x2 it is horizontal (the brick is only on one row)
    if (brick.x1 === brick.x2) {
        return true
    } else {
        return false
    }
}

// Function to check if the spot is last in the row
function isFieldLast(cols, y1) {
    // If y1 coordinate is equal to the number of columns, the field is last
    if (y1 === cols) {
        return true
    } else return false
}

// Function to check if the last brick is vertical
function isLastBrickVertical(baseLayer, cols, x) {

    let result = false
    // Iterate through the bricks to find if there is any with coordinates that match the condition. 
    for (const brick of baseLayer) {
        // If the x1 matches the given argument x, y1 and y2 match the columns count and x2 matches x + 1 then the last brick is vertical
        if (brick.x1 === x && brick.y1 === cols && brick.x2 === x + 1 && brick.y2 === cols) result = true
    }
    return result
}

// Function to check if the last field is horizontal
function areLastTwoVertical(baseLayer, cols, x) {
    let result1 = false
    let result2 = false

    // Iterate through the bricks and find if 2 of them match the conditions for a vertical brick in the last and before last are vertical
    for (const brick of baseLayer) {
        if (brick.x1 === x && brick.y1 === cols && brick.x2 === x + 1 && brick.y2 === cols) result1 = true
        if (brick.x1 === x && brick.y1 === cols - 1 && brick.x2 === x + 1 && brick.y2 === cols - 1) result2 = true
    }

    // If the two results are true then the last two bricks are vertical
    return result1 && result2
}

// Function to check if the row is before the last row
function isRowBeforeLast(rows, x) {
    // Return current row X compared to the before last row 
    return x === rows - 1
}
