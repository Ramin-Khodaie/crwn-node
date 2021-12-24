const JWT = require("jsonwebtoken");
const { setJWT } = require("./redis");
const { addRefreshToken } = require("../model/user/userModel");

const createAccessToken = async (email, id) => {
  const accessToken = JWT.sign({ email }, process.env.ACCESSTOKEN, {
    expiresIn: "10m",
  });

  await setJWT(accessToken, id);
  return Promise.resolve(accessToken);
};

const createRefreshToken = async (email, id) => {
  try {
    const refreshToken = JWT.sign({ email }, process.env.REFRESHTOKEN, {
      expiresIn: "30d",
    });
    await addRefreshToken(id, refreshToken);
    return Promise.resolve(refreshToken);
  } catch (error) {
    return Promise.reject(error);
  }
};

const verifyAccessToken = (jwttoken) => {
  try {
    return Promise.resolve(JWT.verify(jwttoken, process.env.ACCESSTOKEN));
  } catch (error) {
    return Promise.reject(error);
  }
};
const verifyRefreshToken = (jwttoken) => {
  try {
    return Promise.resolve(JWT.verify(jwttoken, process.env.REFRESHTOKEN));
  } catch (error) {
    return Promise.reject(error);
  }
};
module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
