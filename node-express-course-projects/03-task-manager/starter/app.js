const connectDB = require("./db/connect.js");
const express = require("express");
const tasks = require("./routes/tasks.js");
require("dotenv").config();
const notFound = require("./middleware/404.js");

const app = express();

// middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.use(notFound);
const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, console.log(`Server is listening on PORT: ${PORT}...`));
};

start();
