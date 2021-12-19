const mongoose = require("mongoose");

const Student = new mongoose.Schema({
  firstname: { type: String, default: null },
  lastname: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, default: null },
});
module.exports = mongoose.model("Student", Student);
