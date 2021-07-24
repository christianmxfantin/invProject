const products = require("../models").products;

const showProducts = (page, session, res, type, msg) => {
  const offset = parseInt(page) ? parseInt(page) * 10 : 0;
  products
    .findAndCountAll({ limit: 10, offset })
    .then((rows) => {
      console.log(Math.ceil(rows.count / 10) - 1);
      res.status(200).render("products/show", {
        title: "Productos",
        background: "none",
        username: session,
        search: "none",
        totItems: rows.count,
        totPages: Math.ceil(rows.count / 10),
        currentPage: parseInt(page) + 1,
        rows,
        errors: {
          type,
          msg,
        },
      });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  search: (req, res) => {
    res.status(200).render("products/show", {
      title: "Productos",
      background: "none",
      search: "search",
    });
  },
  show: (req, res) => {
    showProducts(req.params.page, req.session.name, res, "none", "");
  },
  create: (req, res) => {
    console.log(req.params);
    products
      .create({
        username: req.session.username,
        description: req.body.description,
        unit_price: req.body.unit_price,
        quantity: req.body.quantity,
      })
      .then(() => {
        showProducts(
          req.params.page,
          req.session.name,
          res,
          "success",
          "Producto agregado"
        );
      })
      .catch((err) => console.log(err));
  },
  edit: (req, res) => {
    console.log(req.params);
    products
      .findByPk(req.params.id)
      .then((row) => {
        console.log(row);
        res.status(200).json(row);
      })
      .catch((err) => console.log(err));
  },
  update: (req, res) => {
    products
      .update(
        {
          username: req.session.username,
          description: req.body.description,
          unit_price: req.body.unit_price,
          quantity: req.body.quantity,
        },
        { where: { id: req.params.id } }
      )
      .then(() => {
        showProducts(req.params.page, req.session.name, res, "none", "");
      })
      .catch((err) => console.log(err));
  },
  destroy: (req, res) => {
    products
      .destroy({ where: { id: req.params.id } })
      .then(() => {
        showProducts(req.params.page, req.session.name, res, "none", "");
      })
      .catch((err) => console.log(err));
  },
  trash: (req, res) => {
    products
      .destroy()
      .then(() => {
        showProducts(req.params.page, req.session.name, res, "none", "");
      })
      .catch((err) => console.log(err));
  },
};
