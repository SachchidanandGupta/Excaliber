const userModel = require("../models/user.model");

async function createUser({ name, email, passwordHash }) {
  const user = await userModel.create({
    name,
    email,
    passwordHash,
  });
  return user;
}

async function findUserByEmail(email) {
  const user = await userModel
    .findOne({ email: email })
    .select("+passwordHash");
  return user;
}

async function findUserById(id) {
  const user = await userModel.findById(id);
  return user;
}

async function addRefreshToken(userId, hashedToken) {
  return await userModel.findByIdAndUpdate(
    userId,
    {
      $push: {
        refreshTokens: hashedToken,
      },
    },
    {
      new: true,
    },
  );
}

async function removeRefreshToken(userId, hashedToken) {
  return await userModel.findByIdAndUpdate(userId, {
    $pull: {
      refreshTokens: hashedToken,
    },
  });
}

async function findUserWithRefreshTokens(userId) {
  const user = await userModel.findById(userId).select("+refreshTokens");
  return user;
}

module.exports = {
  findUserByEmail,
  addRefreshToken,
  createUser,
  findUserById,
  findUserWithRefreshTokens,
  removeRefreshToken,
};
