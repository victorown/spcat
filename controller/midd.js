const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

    console.log(err);
    console.log(process.env.TOKEN_SECRET);

    if (err) {
      console.error("JWT verification error:", err);
      return res.sendStatus(401);
    }

    req.user = user;

    next();
  });
}

module.exports = authenticateToken;
