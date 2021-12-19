require("dotenv").config();
require("./config/db").connect();
const Student = require("./model/student");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const { verify } = require("./middleware/auth");
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("working");
});

app.get("/create", (req, res) => {
  res.sendFile(__dirname + "/views/create.html");
});

app.post("/store", (req, res) => {
  console.log(req.body);
  req.body.password = bcrypt.hashSync(req.body.password);
  Student.insertMany(req.body)
    .then((result) => {
      res.redirect("/display");
    })
    .catch((error) => console.log(error));
});

app.get("/display", verify, (req, res, next) => {
  Student.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.sendFile(__dirname + "/views/display.html");
    }
  });
});
app.get("/studentdata", (req, res) => {
  Student.find({}, (err, data) => {
    if (err) console.log(err);
    res.json({ data: data });
  });
});

app.get("/delete/:id", function (req, res) {
  Student.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) console.log(err);
    else res.redirect("/display");
  });
});

app.get("/edit/:id", (req, res) => {
  res.sendFile(__dirname + "/views/edit.html");
});

app.post("/editstudent", (req, res) => {
  Student.findOne({ _id: req.body._id }, (err, data) => {
    res.json({ data: data });
    console.log(req.body);
  });
});

app.post("/edit", (req, res) => {
  console.log(req.body);
  Student.updateOne(
    { _id: req.body._id },
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    },
    function (err, data) {
      if (err) console.log(err);
      else res.redirect("/display");
    }
  );
});
app.get("/loginform", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const data = await Student.findOne({ email: req.body.email });
    if (data) {
      console.log(data.password);
      const auth = await bcrypt.compare(req.body.password, data.password);
      if (auth) {
        let _token = jwt.sign(
          { email: data.email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: 86400,
          }
        );
        res.cookie("jwt", _token, { secure: true, httpOnly: true });
        res.send("You are authenticated");
      } else {
        res.send("invalid Data");
      }
    } else {
      res.send("invalid data");
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/display");
});
app.listen(process.env.PORT, () => {
  console.log("Running");
});
