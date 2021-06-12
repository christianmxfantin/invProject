const express = require('express')
const router = express.Router()

const auth = require('../controllers/auth')

router.get('/register', auth.register)
router.post('/register', auth.create)

router.get('/login', auth.formLogin)
router.post('/login', auth.login)

router.get('/logout', auth.logout)

module.exports = router