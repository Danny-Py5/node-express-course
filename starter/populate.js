const productModel = require("./models/product");
require("dotenv").config();
const connectDB = require("./db/connect");

const jsonProductData = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to database");
    await productModel.deleteMany();
    console.log("Deleted all products");
    await productModel.create(jsonProductData);
    console.log("Created all products");
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

start();
