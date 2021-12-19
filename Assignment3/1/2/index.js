const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");
const clientID = "clientid";
const clientSecret = "clientsecret";
var access_token = "";

app.get("/", function (req, res) {
  res.render("index", { client_id: clientID });
});

app.listen(3000, () => console.log("App listening on port " + 3000));

app.get("/github/callback", (req, res) => {
  const requestToken = req.query.code;

  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    access_token = response.data.access_token;
    res.redirect("/success");
  });
});

app.get("/success", function (req, res) {
  axios({
    method: "get",
    url: `https://api.github.com/user`,
    headers: {
      Authorization: "token " + access_token,
    },
  }).then((response) => {
    res.render("success", { userData: response.data });
  });
});
