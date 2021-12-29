const { orderSchema } = require("./orderSchema");

//insert order into database
const makeOrder = (order) => {
  return new Promise((resolve, reject) => {
    try {
      orderSchema(order)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
    makeOrder,
};
