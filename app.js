//INSTALAR EN NODE
//npm init -y 
//npm i express 
//npm i sequelize 
//npm i -g sequelize-cli 
//npm i mysql2 
//npm i bcrypt 
//npm i generate-password
//npm i password-validator
//npm i jsonwebtoken


//App
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

//Middlewares
app.use(express.static('static'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Rutas
app.use(require('./routes/auth'))

app.listen(port, () => { console.log(`http://localhost:${port}`) })
