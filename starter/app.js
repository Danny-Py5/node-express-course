const express = require("express");
const connectDB = require("./db/connect");
const productRouter = require("./routes/products");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("express-async-errors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api/v1/products", productRouter);

app.get("/home", (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/v1/products">Products</a>`);
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to MongoDB  😍😍");
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};
startServer();
