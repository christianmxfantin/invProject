const user = require('../models').users
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const toastr = require('toastr')
const authConfig = require('../config/auth')

module.exports = {
    register: (req, res) => {
        res.render('auth/register', {title: 'Registro'})
    },
    create: (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('auth/register', 
                { errors: errors.array(), title: 'Registro' })
        }

        let password = bcrypt.hashSync(req.body.password, authConfig.rounds)

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
              res.render('dashboard', {title: 'Inventario', background: 'none'})
            })
            .catch(err => console.log(err) )
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
                    console.log('Usuario incorrecto')
                    res.status(400).render('auth/login', {
                        toastr: toastr.error('Los datos ingresados son incorrectos'),
                        errors: 'Los datos ingresados son incorrectos', 
                        title: 'Inventario'
                    })
                } else {
                    if (bcrypt.compareSync(password, user.password)) {
                        // Se crea la Sesion
                        user.password = null
                        req.session.userId = user.id
                        res.status(200).render('dashboard', {title: 'Inventario', background: 'none'})
                    } else {
                        //Contraseña incorrecta
                        console.log('Pass incorrecto')
                        res.status(400).render('auth/login', {
                            errors: 'Los datos ingresados son incorrectos', 
                            title: 'Inventario'
                        })
                    }
                }
            })
            .catch(err => {
                console.log('Algo sucedió')
                res.status(500).render('auth/login', {
                    errors: err, 
                    title: 'Inventario'})
        })
    },
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/')
        })
    }
}