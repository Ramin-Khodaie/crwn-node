const { reject } = require("bcrypt/promises");
const { userSchema } = require("./userSchema");

const addNewUser = (user) => {
  return new Promise((resolve, reject) => {
    userSchema(user)
      .save()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (!email) return false;
    try {
      userSchema.findOne({ email }, (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const addRefreshToken = (id, token) => {
  return new Promise((resolve, reject) => {
    console.log(2000, id, token);
    try {
      userSchema
        .findOneAndUpdate(
          { id },
          {
            $set: {
              "refreshToken.token": token,
              "refreshToken.createdAt": new Date(
                Date.now()
              ).toLocaleDateString(),
            },
          },
          { new: true }
        )
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

const deleteRefreshToken = (_id, token) => {
  return new Promise((resolve, reject) => {
    try {
      userSchema
        .findByIdAndUpdate(
          { _id },
          {
            $set: {
              "refreshToken.token": token,
              "refreshToken.createdAt": Date.now(),
            },
          },
          { new: true }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  addNewUser,
  getUserByEmail,
  addRefreshToken,
  deleteRefreshToken,
};
