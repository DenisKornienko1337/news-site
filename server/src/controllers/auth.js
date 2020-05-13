exports.isAuth = (req, res) => {
    res.send({isLoggedIn: req.session.isLoggedIn})
}