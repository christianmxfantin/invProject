const user = require('../models').users
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

module.exports = {
    register: (req, res) => {
        res.render('auth/register', {title: 'Registro'})
    },
    create: (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('auth/register', { errors: errors.array(), title: 'Registro' })
        }

        let password = bcrypt.hashSync(req.body.password, 10)

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
                    res.redirect('auth/login', {errors: 'Usuario incorrecto', title: 'Inventario', background: ''})
                } else {
                    if (bcrypt.compareSync(password, user.password)) {
                        // Creamos la Sesion
                        user.password = null
                        req.session.userId = user.id
                        res.render('dashboard', {title: 'Inventario', background: 'none'})
                    } else {
                        //Unauthorized Access
                        //Contraseña incorrecta
                        console.log('Pass incorrecto')
                        res.render('auth/login', {errors: 'Pass incorrecto', title: 'Inventario', background: ''})
                    }
                }
            })
            .catch(err => {
                console.log('Data incorrecto')
                res.render('auth/login', {errors: 'Datos incorrectos', title: 'Inventario', background: ''})
        })
    },
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/')
        })
    }
}