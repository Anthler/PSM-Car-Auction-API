const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .send("Access denied. No token provided, you must login first");

  try {
    const decodedToken = jwt.verify(token, config.get("jwtprivatekey"));
    req.user = decodedToken;
    next();
  } catch (err) {
    res.send("Invalid token please validate your token");
  }
};
