//INSTALAR EN NODE
//npm init -y 
//npm i express 
//npm i sequelize 
//npm i -g sequelize-cli 
//npm i ejs
//npm i express-ejs-layouts
//npm i mysql2 
//npm i method-override
//npm i bcrypt
//npm i express-session
//npm i express-validator
//npm i password-validator

//npm i generate-password



//App
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const session = require('express-session')
const device = require('express-device')
const port = process.env.PORT || 3000

app.use(session({
  secret: 'jksahfjkasfhjash',
  saveUninitialized: false,
  resave: false,
}))

const authUser = require('./middlewares/auth')
app.use(authUser)

//Views
app.set('view engine', 'ejs')

//Middlewares
app.use(device.capture())
app.use('/static', express.static('static'))
app.use('/static/assets/images', express.static('static'))
app.use(expressLayouts)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

//Index
app.get('/', (req, res) => {
  if (req.device.type === 'phone') {
    global.deviceType = 'phone'
  }else{
    global.deviceType = 'desktop'
  }
  res.render('auth/login', {title: 'Inventario', background: ''})
})

//Rutas
app.use(require('./routes/auth'))


app.listen(port, () => { console.log(`http://localhost:${port}`) })
