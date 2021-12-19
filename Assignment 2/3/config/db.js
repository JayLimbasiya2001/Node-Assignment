const mongoose = require("mongoose");
const { MONGO_URI } = process.env;
exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("connection is established");
    });
};
