const usersModel = require('../models').users
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

module.exports = (req, res, next) => {
    //Comprobar que existe el Token
    if(!req.headers.authorization) {
        res.status(401).json({ msg: 'Acceso no autorizado' })
    }else{
        //Comprobar la validez del Token
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, authConfig.secret , (err, decoded) => {
            if(err) {
                res.status(500).json({ msg: 'Ha ocurrido un problema al decodificar el Token', err })
            }else{
                usersModel.findByPk(decoded.user.id)
                    .then(user => {
                        req.user = user
                        // req.user.dataValues.admin
                        next()
                    })
            }
        })
    }
}