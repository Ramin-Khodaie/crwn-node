const { productionSchema } = require("./productionSchema");

const addProduction = (product) => {
  return new Promise((resolve, reject) => {
    productionSchema(product)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    productionSchema
      .find()
      .select("-items")
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const getShopItems = () => {
  return new Promise((resolve, reject) => {
    productionSchema
      .find({})
      .then((d) => resolve(d))
      .catch((e) => reject(e));
  });
};
const getCategory = (_id) => {
  return new Promise((resolve, reject) => {
    console.log(333, _id);
    productionSchema
      .findById(_id)
      .then((data) => resolve(data))
      .then((err) => reject(err));
  });
};
module.exports = {
  addProduction,
  getAllProducts,
  getCategory,
  getShopItems,
};
