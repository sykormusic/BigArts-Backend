const express = require("express");
const { searchProducts } = require("../controller/productCtrl");
const router = express.Router();

router.get("/", searchProducts);

module.exports = router;
