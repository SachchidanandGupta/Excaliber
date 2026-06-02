const {
  addRefreshToken,
  createUser,
  findUserByEmail,
  findUserById,
  findUserWithRefreshTokens,
  removeRefreshToken,
} = require("../repositories/user.repository");

const { comparePassword, hashPassword } = require("../utils/password.utils");
const {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../utils/jwt.utils");
const AppError = require("../utils/appError");

const registerUser = async ({ name, email, password }) => {
  const data = await findUserByEmail(email);
  if (data) {
    throw new AppError("User already exists", 409);
  }

  const passwordHash = await hashPassword(password);

  const user = await createUser({ name, email, passwordHash });
  const accessToken = await signAccessToken({
    id: user._id,
    email: user.email,
  });
  const refreshToken = await signRefreshToken({
    id: user._id,
    email: user.email,
  });
  const hashedRefreshToken = await hashPassword(refreshToken);
  await addRefreshToken(user._id, hashedRefreshToken);
  return {
    user,
    accessToken,
    refreshToken,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isPasswordCorrect = await comparePassword(password, user.passwordHash);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid credentials", 401);
  }
  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken({ id: user._id, email: user.email }),
    signRefreshToken({ id: user._id, email: user.email }),
  ]);
  const hashedRefreshToken = await hashPassword(refreshToken);
  await addRefreshToken(user._id, hashedRefreshToken);
  return {
    user,
    accessToken,
    refreshToken,
  };
};

const refresh = async (refreshToken) => {
  const response = await verifyRefreshToken(refreshToken);
  if (!response) {
    throw new AppError("Invalid token , Unauthorized", 401);
  }
  const userId = response.id;
  const user = await findUserWithRefreshTokens(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  for (const item of user.refreshTokens) {
    const token = await comparePassword(refreshToken, item);
    if (token) {
      const [accessToken, newRefreshToken] = await Promise.all([
        signAccessToken({ id: user._id, email: user.email }),
        signRefreshToken({ id: user._id, email: user.email }),
      ]);
      const hashedRefreshToken = await hashPassword(newRefreshToken);
      await Promise.all([
        removeRefreshToken(userId, item),
        addRefreshToken(userId, hashedRefreshToken),
      ]);
      return {
        accessToken,
        newRefreshToken,
      };
    }
}
throw new AppError("Unauthorized", 401);
};

const logout = async (userId, refreshToken) => {
  const user = await findUserWithRefreshTokens(userId);
  if (!user) {
    return;
  }

  for (const item of user.refreshTokens) {
    const token = await comparePassword(refreshToken, item);
    if (token) {
      await removeRefreshToken(user._id, item);
      return;
    }
  }

  return "success";
};

module.exports = {
  registerUser,
  loginUser,
  refresh,
  logout,
};
