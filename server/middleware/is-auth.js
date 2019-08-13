const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    // Verify the token using the salt ('Betwisor')
    try {
        // Get the Authorization header
        const authHeader = req.get('Authorization');

        // Retrieve the jwt from the header, it's the secon param, the first id 'Bearer'
        const token = authHeader.split(' ')[1];
        jwt.verify(token, 'Betwisor');
        next();
    } catch (err) {
        res.status(401).json({message: 'Authentication failed'});
        throw err;
    }
}