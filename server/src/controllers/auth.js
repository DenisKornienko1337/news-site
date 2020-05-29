exports.isAuth = (req, res) => {
    res.send({
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
        user: req.session.username,
    })
}