const jwt = require("jsonwebtoken");
const env = require("../config/env");

function signAccessToken(payload) {
  const token = jwt.sign(payload, env.jwt.secret, { expiresIn: "15m" });
  return token;
}

function signRefreshToken(payload) {
  const refreshToken = jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: "7d",
  });
  return refreshToken;
}

function verifyAccessToken(token) {
  const decoded = jwt.verify(token, env.jwt.secret);
  return decoded;
}

function verifyRefreshToken(refreshToken) {
  const decoded = jwt.verify(refreshToken, env.jwt.refreshSecret);
  return decoded;
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
