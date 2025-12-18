const { createCustomAPIError } = require("../errors/custom-api-error");
const productModel = require("../models/product");

const getAllProductsStatic = async (req, res, next) => {
  const sortedProducts = await productModel
    .find({ price: { $gt: 30, $lt: 100 } })
    .sort("-price")
    .select("price");
  // .limit(4);
  // .skip(8);
  res.status(200).json({ sortedProducts, length: sortedProducts.length });
};

const getAllProducts = async (req, res, next) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
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
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    // console.log(filters.split(",")[0].split("-"));
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
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
  if (
    (req.query.pages && req.query.limit) ||
    req.query.pages ||
    req.query.limit
  ) {
    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    products = await result.skip(skip).limit(limit);
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
