const user = require('../models').user

module.exports = (req, res, next) => {

    if (!req.originalUrl.includes('dashboard')) return next()

    if (req.session.userId) return next()

    res.redirect('/login')
}