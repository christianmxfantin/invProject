//INSTALAR EN NODE
//npm init -y 
//npm i express 
//npm i sequelize 
//npm i -g sequelize-cli 
//npm i ejs
//npm i mysql2 
//npm i method-override

//npm i bcrypt 
//npm i generate-password
//npm i password-validator


//App
const express = require('express')
const app = express()
const device = require('express-device')
const methodOverride = require('method-override')
const port = process.env.PORT || 3000

//Views
app.set('view engine', 'ejs')

//Middlewares
app.use(device.capture())
app.use('/static', express.static('static'))
app.use('/static/assets/images', express.static('static'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Index
app.get('/', (req, res) => {
  res.render('auth/login')
})

//Rutas
// app.use(require('./routes/auth'))
if (req.device.type === 'phone') {
  app.use(require('./routes/dashboard/mobile'))
}else{
  app.use(require('./routes/dashboard/desktop'))
}

app.listen(port, () => { console.log(`http://localhost:${port}`) })
