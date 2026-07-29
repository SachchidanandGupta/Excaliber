const AppError = require("../utils/appError");
const { verifyAccessToken } = require("../utils/jwt.utils");
const authenticate = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    throw new AppError("token not provided", 401);
  }
  const token = header.split(" ")[1];
  let decoded;
  try {
    decoded = await verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
};

module.exports = authenticate;
