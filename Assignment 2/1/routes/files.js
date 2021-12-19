const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

//singlefile
router.get("/addfile", function (req, res) {
  res.render("addfile");
});

//multiple file
router.get("/addfiles", function (req, res) {
  res.render("addfiles");
});

//upload singlefile
router.post("/upload", upload.single("singlefile"), function (req, res) {
  let fileinf = req.file;
  console.log(fileinf);
  res.send(fileinf);
});

//upload multiplefile
router.post("/uploads", upload.array("multiplefiles"), function (req, res) {
  let fileinf = req.files;
  console.log(fileinf);
  res.send(fileinf);
});
module.exports = router;
