const redis = require("redis");
const client = redis.createClient();

//set JWT key value pair in redis
const setJWT = (key, value) => {
  return new Promise((resolve, reject) => {
    try {
      return client.set(key, value, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getJWT = (key) => {
  return new Promise((resolve, reject) => {
    try {
      return client.get(key, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteJWT = (key) => {
  console.log(5000, key);
  try {
    return client.del(key);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  setJWT,
  getJWT,
  deleteJWT,
};
