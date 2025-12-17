const express = require("express");
const router = express.Router();
const { controllers } = require("../controllers/products");

router
  .route("/")
  .get(controllers.getAllProducts)
  .post(controllers.createProduct);
router
  .route("/:id")
  .delete(controllers.deleteProduct)
  .get(controllers.getProduct)
  .patch(controllers.updateProduct);

module.exports = router;
