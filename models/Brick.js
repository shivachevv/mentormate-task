class Brick {
    constructor(number, x1, y1, x2, y2) {
        this.number = number
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
    }

    placeHorizontally(x1, y1) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x1
        this.y2 = y1 + 1
    }
    placeVertically(x1, y1) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x1 + 1
        this.y2 = y1
    }
}

module.exports = Brick
