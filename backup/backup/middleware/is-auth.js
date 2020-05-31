module.exports = (req, res, next) => {
    if(!req.session.isLoggedIn){
        res.sendStatus(401)
        return
    }
    next()
}