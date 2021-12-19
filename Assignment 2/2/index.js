const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const sessions = require("express-session");
app.set("view engine", "ejs");

app.use(
  sessions({
    secret: "anyseceretkey",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.use(cookieparser());

app.listen(3000, () => {
  console.log("server is running on 3000 port");
});
const username = "Jay";
const password = "Jayl@1234";

var session;

app.get("/login", (req, res) => {
  session = req.session;
  res.render("login");
});

app.post("/loginuser", (req, res) => {
  if (req.body.username == username && req.body.password == password) {
    session = req.session;
    session.username = req.body.username;
    console.log(req.session);
    res.send("you are login");
  } else {
    res.send("invalid data");
  }
});
