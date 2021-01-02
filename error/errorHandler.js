// Function to print error msg to the user.
function handleError(err, startFunction){
    const errMsg = '-1\nWe apoligize for the inconvenience. Please try again with alternative base layer!'
    console.log(errMsg);

    // After the error msg has been printed we start the app again.
    return startFunction()
}

module.exports = handleError