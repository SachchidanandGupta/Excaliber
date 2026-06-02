const asyncHandler = require("../utils/asyncHandler");
const {
  registerUser,
  loginUser,
  refresh,
  logout
} = require("../services/auth.service");
const env = require("../config/env");
const AppError = require("../utils/appError");
const {findUserById} = require("../repositories/user.repository");


const registerController = asyncHandler(async function (req, res) {
  const { name, email, password } = req.body;
  const { user, accessToken, refreshToken } = await registerUser({
    name,
    email,
    password,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: env.nodeEnv === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    accessToken,
  });
});

const loginController = asyncHandler(async function (req, res) {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await loginUser({
    email,
    password,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: env.nodeEnv === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    accessToken,
  });
});

const refreshController = asyncHandler(async function (req, res) {
  const token = req.cookies.refreshToken;
  if (!token) {
    throw new AppError("No refresh token", 401);
  }
  const { accessToken, newRefreshToken } = await refresh(token);

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: env.nodeEnv === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    accessToken,
  });
});

const logOutController = asyncHandler(async function(req,res){
    const token = req.cookies.refreshToken;
    const userId = req.user.id;
    if(!token){
        res.clearCookie("refreshToken")
        return res.status(200).json({
        success:true,
        message:"Logged out"
    })
    }

    await logout(userId,token);
    res.clearCookie("refreshToken");

    return res.status(200).json({
        success:true,
        message:"Logged out"
    })
});

const getMeController = asyncHandler(async function(req,res){
     const userId = req.user.id;
     const user =  await findUserById(userId);
     if(!user){
        throw new AppError("User not found",404);
     }

     return res.status(200).json({
        success:true,
        user
     })
})


module.exports = {
    registerController,loginController,
    refreshController,logOutController,
    getMeController
}