// Class Brick for every brick in the layer
class Brick {
    constructor(number, x1, y1, x2, y2) {
        // Set the number and coordinates of the brick
        this.number = number
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
    }

    // Method to place the brick horizontally upon given 2 coordinates (x2 and y2 are calculated to ocupy next horizontal space)
    placeHorizontally(x1, y1) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x1
        this.y2 = y1 + 1
    }

    // Method to place the brick vertically upon given 2 coordinates (x2 and y2 are calculated to ocupy bottom space)
    placeVertically(x1, y1) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x1 + 1
        this.y2 = y1
    }
}

module.exports = Brick
