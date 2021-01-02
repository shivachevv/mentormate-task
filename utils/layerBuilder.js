const Brick = require("../models/Brick")

const layerBuilder = (baseLayer, dimensions) => {
    const brickStack = baseLayer.map(x => new Brick(x.number, x.x1, x.y1, x.x2, x.y2))
    const newLayer = []
    const [rows, cols] = dimensions
    for (let i = 1; i <= rows; i++) {

        for (let j = 1; j <= cols; j++) {
            const x = i
            const y = j
            // // console.log(x, y);
            if (isSpotFree("current", x, y, newLayer)) {
                const baseBrick = isThereBaseBrick(x, y, baseLayer)
                const newBrick = brickStack.shift()
                if (y === 2 && isLastBrickVertical(baseLayer, cols, x) && !areLastTwoVertical(baseLayer, cols, x)) {
                    newBrick.placeVertically(x, y)
                    newLayer.push(newBrick)
                    // console.log(7, x, y, newBrick);
                } else if (y === cols - 2 && areLastTwoVertical(baseLayer, cols, x)) {
                    newBrick.placeVertically(x, y)
                    newLayer.push(newBrick)
                    // console.log(8, x, y, newBrick);
                } else {
                    if (baseBrick.part && baseBrick.part === 1) {
                        if (isBrickHorizontal(baseBrick.brick)) {
                            newBrick.placeVertically(x, y)
                            newLayer.push(newBrick)
                            // console.log(1, x, y, newBrick);
                        } else {
                            if (isSpotFree("right", x, y, newLayer)) {
                                newBrick.placeHorizontally(x, y)
                                newLayer.push(newBrick)
                                // console.log(2, x, y, newBrick);
                            } else {
                                newBrick.placeVertically(x, y)
                                newLayer.push(newBrick)
                                // console.log(3, x, y, newBrick);
                            }
                        }
                    }
                    if (baseBrick.part && baseBrick.part === 2) {
                        if (isFieldLast(cols, y)) {
                            newBrick.placeVertically(x, y)
                            newLayer.push(newBrick)
                            // // console.log(3, newBrick);
                        } else {
                            if (isSpotFree("right", x, y, newLayer)) {
                                newBrick.placeHorizontally(x, y)
                                newLayer.push(newBrick)
                                // console.log(5, x, y, newBrick);
                            } else {
                                newBrick.placeVertically(x, y)
                                newLayer.push(newBrick)
                                // console.log(6, x, y, newBrick);
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

function isSpotFree(type, x1, y1, newLayer) {
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

    if (newLayer.length === 0) return true

    return !newLayer.filter(newBrick => {
        if (newBrick.x1 === map[type].x && newBrick.y1 === map[type].y) {
            return newBrick
        }
        if (newBrick.x2 === map[type].x && newBrick.y2 === map[type].y) {
            return newBrick
        }
    }).length
}

function isThereBaseBrick(x1, y1, baseLayer) {
    let result = {
        part: 0,
        brick: undefined
    }
    baseLayer.forEach(brick => {
        if (brick.x1 === x1 && brick.y1 === y1) {
            result.part = 1
            result.brick = brick
            // // console.log("check1");
        }
        // // console.log(brick, x1, y1);
        if (brick.x2 === x1 && brick.y2 === y1) {
            result.part = 2
            result.brick = brick
            // // console.log("check2");
        }
    })
    return result
}

function isBrickHorizontal(brick) {
    if (brick.x1 === brick.x2) {
        return true
    } else {
        return false
    }
}

function isFieldLast(cols, y1) {
    if (y1 === cols) {
        return true
    } else return false

}

function isLastBrickVertical(baseLayer, cols, x) {
    let result = false
    for (const brick of baseLayer) {
        if (brick.x1 === x && brick.y1 === cols && brick.x2 === x + 1 && brick.y2 === cols) result = true
    }
    return result
}

function areLastTwoVertical(baseLayer, cols, x) {
    let result1 = false
    let result2 = false
    for (const brick of baseLayer) {
        if (brick.x1 === x && brick.y1 === cols && brick.x2 === x + 1 && brick.y2 === cols) result1 = true
        if (brick.x1 === x && brick.y1 === cols - 1 && brick.x2 === x + 1 && brick.y2 === cols - 1) result2 = true
    }
    return result1 && result2
}


