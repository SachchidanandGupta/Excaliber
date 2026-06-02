const dotenv = require("dotenv");

dotenv.config();

const env = {
    port:process.env.PORT || 8080,
    mongo:{
        uri:process.env.MONGO_URI
    },
    jwt:{
        secret:process.env.JWT_SECRET,
        refreshSecret:process.env.REFRESH_SECRET
    },
    nodeEnv:process.env.NODE_ENV || "development",
    clientUrl:process.env.CLIENT_URL
}


if (!env.mongo.uri) {
  throw new Error("MONGO_URI is missing in .env");
}

if (!env.jwt.secret) {
  throw new Error("JWT_SECRET is missing in .env");
}

if(!env.clientUrl){
    throw new Error("CLIENT_URL is missing in .env")
}


module.exports = env;
