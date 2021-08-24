# Inventario .inv

Product inventory and stock management software

## Installation

First install all dependencies with:

```
npm install
```

Then, install Xampp or similar program to run MySQL
Create a database called inventory

Run the migrations to create the tables:

```
sequelize-cli.cmd db:migrate
```

Run the seeders to populate the database:

```
sequelize-cli.cmd db:seed:all
```

Type and execute to start the application:

```
node start
```

The password for the predefined users is 12345678

## Demo

If you want to see the demo of this proyect deployed, you can visit [Inventario] (https://invproject.herokuapp.com/)
