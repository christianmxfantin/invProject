require("dotenv").config();

module.exports = async () => ({
  development: {
    username: "root",
    password: null,
    database: "inventory",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "inventory_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: process.env.DB_URL,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
});
