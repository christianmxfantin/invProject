//App
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const authConfig = require("./config/auth");
const port = process.env.PORT || 4000;
const dotenv = require("dotenv");
dotenv.config();

//Views
app.set("view engine", "ejs");

//Middlewares
app.use("/static", express.static("static"));
app.use("/static/assets/images", express.static("static"));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

//Database Sessions
const options = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(options);
const sessionStore = new MySQLStore(options, connection);

app.use(
  session({
    secret: authConfig.secret,
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    expiration: 86400000, //one day
  })
);

//Index
app.get("/", (req, res) => {
  res.status(200).render("auth/login", { title: "Inventario", background: "" });
});

//Routes
app.use(require("./routes/auth"));
app.use(require("./routes/dashboard"));
app.use(require("./routes/products"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
