//INSTALAR EN NODE
//npm init -y 
//npm i express 
//npm i sequelize 
//npm i -g sequelize-cli 
//npm i ejs
//npm i express-ejs-layouts
//npm i mysql
//npm i mysql2 
//npm i method-override
//npm i bcrypt
//npm i express-session
//npm i express-mysql-session
//npm i express-validator
//npm i password-validator
//npm i generate-password
//npm i toastr


//App
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const mysql = require('mysql')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const authConfig = require('./config/auth')
const authUser = require('./middlewares/auth')
const port = process.env.PORT || 3000

//Views
app.set('view engine', 'ejs')

//Middlewares
app.use('/static', express.static('static'))
app.use('/static/assets/images', express.static('static'))
app.use(expressLayouts)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(authUser)

//Database Sessions
const options = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: null,
  database: 'inventory'
}

const connection = mysql.createConnection(options)
const sessionStore = new MySQLStore(options, connection)

app.use(session({
  secret: authConfig.secret,
  saveUninitialized: false,
  resave: false,
  store: sessionStore,
  expiration: 86400000 //one day
}))


//Index
app.get('/', (req, res) => {
  res.render('auth/login', {title: 'Inventario', background: ''})
})


//Rutas
app.use(require('./routes/auth'))


app.listen(port, () => { console.log(`http://localhost:${port}`) })
