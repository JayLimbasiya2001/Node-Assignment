const express = require("express");
const fileRouter = require("./routes/files");
const app = express();

app.set("view engine", "ejs");
app.use("/files", fileRouter);
app.listen(3000, function () {
  console.log(`Server is running on port 3000`);
});
