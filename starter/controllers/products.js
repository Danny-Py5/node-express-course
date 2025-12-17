const { createCustomAPIError } = require("../errors/custom-api-error");
const productModel = require("../models/product");

const getAllProductsStatic = async (req, res, next) => {
  const sortedProducts = await productModel
    .find({})
    .sort("name")
    .select("name price")
    .limit(10)
    .skip(10);
  res.status(200).json({ sortedProducts, length: sortedProducts.length });
};

const getAllProducts = async (req, res, next) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let result = productModel.find(queryObject);
  // sort
  let products;
  if (sort) {
    console.log(sort.replace(/,/g, " "));
    products = await result.sort(sort.replace(/,/g, " "));
  } else {
    products = await result;
  }

  // select field
  if (fields) {
    products = await result.select(fields.replace(/,/g, " "));
  }

  res.status(200).json({ products, length: products.length });
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
    getAllProductsStatic,
  },
};
