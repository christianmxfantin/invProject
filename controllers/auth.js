const user = require('../models').users
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

module.exports = {
    register: (req, res) => {
        res.render('auth/register')
    },
    create: (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('auth/register', { errors: errors.array() })
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
              //preguntar si es mobile o dashboard
              if (global.deviceType === 'phone') {
                res.render('dashboard/mobile')
              }else{
                res.render('dashboard/desktop')
              }
            })
            .catch(err => console.log(err) )
    },
    formLogin: (req, res) => {
        res.render('auth/login')
    },
    login: (req, res) => {
        user.login(req.body.username, req.body.password)
            .then(user => {
                if (user) {
                    req.session.userId = user.id
                }
                //preguntar si es mobile o dashboard
                if (global.deviceType === 'phone') {
                    res.render('dashboard/mobile')
                }else{
                    res.render('dashboard/desktop')
                }
            })
            .catch(err => console.log(err) )
    },
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/')
        })
    }
}