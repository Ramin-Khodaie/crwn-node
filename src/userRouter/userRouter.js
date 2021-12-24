const express = require("express");
const {
  addNewUser,
  getUserByEmail,
  deleteRefreshToken,
} = require("../../model/user/userModel");

const {
  hashedPassword,
  comparePassword,
} = require("../../utils/hashedPassword");

const { userAuthorization } = require("../../utils/authorization");
const {
  createAccessToken,
  createRefreshToken,
} = require("../../utils/JWTTokens");
const { deleteJWT } = require("../../utils/redis");
const router = express.Router();

//add new user
router.post("/newuser", async (req, res) => {
  const { name, email, password } = req.body;
  const encryptedPassword = await hashedPassword(password);
  const newUser = {
    name,
    email,
    password: encryptedPassword,
  };
  const result = await addNewsUser(newUser);
  if (result) {
    return res.json({ status: "success", message: "new user added." });
  }
  return res.json({ status: "error", message: result.error });
});

//user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({ status: "error", message: "invalid form submition" });

  const user = await getUserByEmail(email);

  if (!user)
    return res.json({ status: "error", message: "Invalid email or password" });

  const hashedPassword = user && user.password;
  const isPasswordMatch = await comparePassword(password, hashedPassword);

  if (!isPasswordMatch) {
    res.json({ status: "error", message: "Invalid email or password" });
  }

  const accessToken = await createAccessToken(user.email, `${user._id}`);
  const refreshToken = await createRefreshToken(user.email, `${user._id}`);

  res.json({
    status: "success",
    message: "login successfuly",
    userinfo: {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    accessToken,
    refreshToken,
  });
});

//user logout
router.delete("/logout", userAuthorization, async (req, res) => {
 
  const { authorization } = req.headers;

  const userId = req.userId;

  deleteJWT(authorization);

  const user = await deleteRefreshToken(userId, "");
  console.log(1122,user)
  if (user._id) {
    res.json({ status: "success", message: "loggout successfuly", user });
  } else {
    res.json({
      status: "error",
      message: "you cannot logged out,plz try again.",
    });
  }
});
module.exports = router;
