const user = require('../models').users
const { ValidationError } = require('sequelize')
const bcrypt = require('bcrypt')
const passwordValidator = require('password-validator')
const authConfig = require('../config/auth')

module.exports = {
    register: (req, res) => {
        res.render('auth/register', {title: 'Registro'})
    },
    create: (req, res) => {
        let password = req.body.password
        let schema = new passwordValidator()
        schema
            .is().min(8)   // Minimum length 8
            .is().max(50)  // Maximum length 50
            .has().not().spaces()    

        if (schema.validate(password)) {
            password = bcrypt.hashSync(req.body.password, authConfig.rounds)
            user.create({ 
                username: req.body.username,
                password: password,
                admin: true,
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email
            })
                .then(result => {
                result.password = null
                res.status(200).render('dashboard', {
                    errors: {
                        type: 'success',
                        msg: 'Datos correctos'
                    },
                    title: 'Inventario', 
                    background: 'none',
                    user: result.name.split(' ')[0]
                    })
                })
                .catch(err => {
                    if(err instanceof ValidationError){
                        res.status(500).render('auth/register', {
                            errors: {
                                type: 'error',
                                msg: err.errors[0].message
                            }, 
                            title: 'Inventario'})
                    }
                    res.status(500).render('auth/register', {
                        errors: {
                            type: 'error',
                            msg: err
                        }, 
                        title: 'Inventario'})
                })
        }
    },
    formLogin: (req, res) => {
        res.render('auth/login', {title: 'Inventario'})
    },
    login: (req, res) => {
        let { username, password } = req.body

        user.findOne({ where: {username: username} })
            .then(user => {
                if (!user) {
                    //Usuario incorrecto
                    res.status(400).render('auth/login', {
                        errors: {
                            type: 'warning',
                            msg: 'Los datos ingresados son incorrectos'
                        }, 
                        title: 'Inventario'
                    })
                } else {
                    if (bcrypt.compareSync(password, user.password)) {
                        // Se crea la Sesion
                        user.password = null
                        req.session.userId = user.id
                        res.status(200).render('dashboard', {
                            errors: {
                                type: 'success',
                                msg: 'Datos correctos'
                            },
                            title: 'Inventario', 
                            background: 'none',
                            user: user.name.split(' ')[0]
                            })
                    } else {
                        //Contraseña incorrecta
                        res.status(400).render('auth/login', {
                            errors: {
                                type: 'warning',
                                msg: 'Los datos ingresados son incorrectos'
                            }, 
                            title: 'Inventario'
                        })
                    }
                }
            })
            .catch(err => {
                if(err instanceof ValidationError){
                    res.status(500).render('auth/login', {
                        errors: {
                            type: 'error',
                            msg: err.errors[0].message
                        }, 
                        title: 'Inventario'})
                }
                res.status(500).render('auth/login', {
                    errors: {
                        type: 'error',
                        msg: err
                    }, 
                    title: 'Inventario'})
            })
    },
    logout: (req, res) => {
        req.session.destroy(() => {
            res.status(200).render('auth/login', {
                errors: {
                    type: 'success',
                    msg: 'La sesión se cerró correctamente'
                },
                title: 'Inventario', 
                background: ''
                })
        })
    }
}