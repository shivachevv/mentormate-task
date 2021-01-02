function handleError(err, startFunction){
    const errMsg = '-1\nWe apoligize for the inconvenience. Please try again with alternative base layer!'
    console.log(errMsg);
    return startFunction()
}

module.exports = handleError