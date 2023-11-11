const jsonwebtoken = require("jsonwebtoken");

const auth = (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.status(401).json({
      status: "failed",
      message: "No token provided",
    });
  }
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    // console.log(accessToken);
    const verifyJWT = jsonwebtoken.verify(accessToken, process.env.jwtKEY);
    req.user = verifyJWT; // set the jwt in the req body payload
    next();
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Invalid or expired token",
    });
  }
};

module.exports = auth;
