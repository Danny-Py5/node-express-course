const { createCustomAPIError } = require("../errors/custom-api-error");
const productModel = require("../models/product");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ products, length: products.length });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await productModel.findOne({ _id: req.params.id });
    if (!product) {
      return next(
        createCustomAPIError(`No product with id: ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    res.status(201).json({ product: createdProduct });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await productModel.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedProduct) {
      return next(
        createCustomAPIError(`No product with id: ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      deletedProduct,
      msg: `product  deleted`,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return next(
        createCustomAPIError(`No product with id: ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ product: updatedProduct });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  controllers: {
    getAllProducts,
    createProduct,
    deleteProduct,
    getProduct,
    updateProduct,
  },
};
