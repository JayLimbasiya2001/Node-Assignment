const express = require("express");
const router = express.Router();
const Student = require("./model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verify } = require("./middleware");
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    var data = await Student.findOne({ email: req.body.email });
    console.log(data);
    if (data) {
      var auth = await bcrypt.compare(req.body.password, data.password);
      if (auth) {
        let _token = jwt.sign({ email: req.body.email }, "secret", {
          expiresIn: 86400,
        });
        console.log(_token);
        res.cookie("jwt", _token, { secure: false, httpOnly: true });
        res.send("You are authenticated");
      } else {
        res.redirect("/");
      }
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/store", (req, res) => {
  var pass = bcrypt.hashSync("111111");

  const obj = new Student({
    name: "gaurav",
    email: "gaurav@gmail.com",
    password: pass,
  });
  Student.insertMany(obj, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });
});

router.get("/", (req, res) => {
  res.send("Unauthenticated user");
});

router.get("/api", verify, (req, res) => {
  res.send("access your api");
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/login");
});
module.exports = router;
