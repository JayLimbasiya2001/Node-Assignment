const jwt = require("jsonwebtoken");

exports.verify = (req, res, next) => {
  console.log(req);
  const _token = req.cookies.jwt;
  try {
    jwt.verify(_token, "secret", (err, decodedtoken) => {
      if (err) res.redirect("/login");
      else console.log(decodedtoken);
      next();
    });
  } catch (e) {
    return res.status(401).send();
  }
};
