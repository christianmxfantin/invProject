const usersModel = require('../models').users
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passwordValidator = require('password-validator')
const authConfig = require('../config/auth')

module.exports = {
    login: (req, res) => {

        let { username, password } = req.body

        // Buscar usuario
        usersModel.findOne({ where: {username: username} })
            .then(user => {
                if (!user) {
                    //Usuario incorrecto
                    res.status(404).json({ msg: 'Los datos ingresados son incorrectos' })
                } else {
                    if (bcrypt.compareSync(password, user.password)) {
                        // Creamos el token
                        user.password = null
                        let token = jwt.sign({ user }, authConfig.secret , {
                            expiresIn: authConfig.expires
                        })
                        res.json({
                            user: user,
                            token: token
                        })
                    } else {
                        //Unauthorized Access
                        //Contraseña incorrecta
                        res.status(401).json({ msg: 'Los datos ingresados son incorrectos' })
                    }
                }
            })
            .catch(err => {
                res.status(500).json(err)
        })
    },
    register: (req, res) => {
        let password = req.body.password
        let schema = new passwordValidator()
        schema
            .is().min(8)   // Minimum length 8
            .is().max(50)  // Maximum length 50
            .has().not().spaces()    

        if (schema.validate(password)) {
            password = bcrypt.hashSync(req.body.password, Number(authConfig.rounds)) 
            console.log(req.body)
            // Crear un usuario
            usersModel.create({
                username: req.body.username,
                password: password,
                admin: req.body.admin,
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email
            }).then(user => {
                // Creamos el token
                user.password = null
                let token = jwt.sign({ user }, authConfig.secret, {
                    expiresIn: authConfig.expires
                })
                res.json({
                    user: user,
                    token: token
                })
            }).catch(err => {
                // console.log(70, err)
                res.status(500).json(err)
            })
        }else{
            res.status(500).json({ error: 'La contraseña contiene datos inválidos' })
        }
    }

}