const e = require("express");
const express = require("express");
const { addNewUser, getUserByEmail } = require("../../model/user/userModel");

const {
  hashedPassword,
  comparePassword,
} = require("../../utils/hashedPassword");

const {createAccessToken,createRefreshToken} = require("../../utils/JWTTokens")
const router = express.Router();

//add new user
router.post("/newuser", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body)
  const encryptedPassword = await hashedPassword(password);
  const newUser = {
    name,
    email,
    password: encryptedPassword,
  };
  const result = await addNewUser(newUser);
  if (result) {
    return res.json({ status: "success", message: "new user added." });
  }
  return res.json({ status: "error", message: result.error });
});

//user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
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
    userinfo:{
      name:user.name,
      email:user.email,
      createdAt:user.createdAt
    },
    accessToken,
    refreshToken,
  });
});

//user logout
router.delete("/logout",(req,res)=>{

})
module.exports = router;
