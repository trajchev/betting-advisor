module.exports = val => {
    // Asure we get and int as a port number
    var port = parseInt(val, 10);

    if(isNaN(port)) {
        return val
    }

    if(port >= 0) {
        return port;
    }

    return false;
}