exports.isAuth = (req, res) => {
    res.send({
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
        username: req.session.username,
    })
}