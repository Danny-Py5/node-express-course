const { createCustomAPIError } = require("../errors/custom-api-error");
const asyncWrapper = require("../middleware/asyncWrapper");
const productModel = require("../models/product");

const getAllProducts = asyncWrapper(async (req, res, next) => {
  const products = await productModel.find({});
  res.status(200).json({ products, length: products.length });
});

const getProduct = asyncWrapper(async (req, res, next) => {
  const product = await productModel.findOne({ _id: req.params.id });
  if (!product) {
    return next(
      createCustomAPIError(`No product with id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ product });
});

const createProduct = asyncWrapper(async (req, res, next) => {
  const createdProduct = await productModel.create(req.body);
  res.status(201).json({ createdProduct });
});

const deleteProduct = asyncWrapper(async (req, res, next) => {
  const deletedProduct = await productModel.findOneAndDelete({
    _id: req.params.id,
  });

  if (!deletedProduct) {
    const err = createCustomAPIError(
      `No product with id: ${req.params.id}`,
      404
    );
    return next(err);
  }
  res.status(200).json({
    deletedProduct,
    msg: `product  deleted`,
    id: req.params.id,
    method: req.method,
    url: req.url,
  });
});

const updateProduct = asyncWrapper(async (req, res, next) => {
  const updatedProduct = await productModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidation: true }
  );
  if (!updatedProduct) {
    return next(
      productModel.createCustomAPIError(
        `No product with id: ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ msg: "product updated!" });
});

module.exports = {
  controllers: {
    getAllProducts,
    createProduct,
    deleteProduct,
    getProduct,
    updateProduct,
  },
};
