// Handle the server error event (onError)
module.exports = error => {
    if(error.syscall !== 'listen') {
        throw error;
    }
    // Spit our error message based on error code
    const bind = typeof addr === 'string' ? 'pipe' + addr : 'port' + port;
    switch(error.code) {
        case 'EACCESS':
            console.error(bind + " required elevated priviledges");
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}