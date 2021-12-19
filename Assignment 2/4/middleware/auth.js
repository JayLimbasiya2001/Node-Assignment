const jwt = require("jsonwebtoken");

exports.verify = (req, res, next) => {
  const _token = req.cookies.jwt;
  console.log(_token);
  try {
    jwt.verify(_token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        res.redirect("/loginform");
        console.log(err);
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } catch (e) {
    return res.status(401).send();
  }
};
