const logout = (req, res) => {

    // Modify cookie to log user out
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 1000),
        httpOnly: true
    });

    // Inform user they're logged out
    res.status(200).json({ status: 'success' });

};

module.exports = logout;