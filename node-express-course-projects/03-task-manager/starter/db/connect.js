const mongoose = require("mongoose");

const connectDB = (uri) => {
  mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log("MONGODB CONNECTED...");
};

module.exports = connectDB;
