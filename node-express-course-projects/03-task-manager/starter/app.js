const connectDB = require("./db/connect.js");
const express = require("express");
require("dotenv").config();

const tasks = require("./routes/tasks.js");

const app = express();

// middleware
app.use(express.json());

// get request
app.get("/hello", (req, res) => {
  res.send("<h1>Task Manager App</h1>");
});

app.use("/api/v1/tasks", tasks);
const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, console.log(`Server is listening on PORT: ${PORT}...`));
};

start();
