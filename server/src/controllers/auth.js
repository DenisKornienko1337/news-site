exports.isAuth = (req, res) => {
    console.log(req.session.isLoggedIn)
    res.send({isLoggedIn: req.session.isLoggedIn})
}