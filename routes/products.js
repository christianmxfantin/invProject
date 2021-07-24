const express = require("express");
const router = express.Router();

const products = require("../controllers/products");

router.get("/products/search/:data", products.search);
router.get("/products/:page", products.show);
router.post("/products/:page", products.create);
router.get("/products/edit/:id", products.edit);
router.put("/products/:id", products.update);
router.delete("/products/:id", products.destroy);
router.delete("/products/", products.trash);

module.exports = router;
