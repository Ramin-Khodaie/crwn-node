const express = require("express");
const { makeOrder } = require("../../model/order/orderModel");
const router = express.Router();

router.post("/", async (req, res) => {
  const { order } = req.body;

  if (!order) {
    return res.json({ status: "error", message: "invalid information" });
  }
  const result = await makeOrder(order);
  if (result) {
    return res.json({
      status: "success",
      message: "order complete successfuly",
    });
  } else {
    return res.json({ status: "error", message: result.error });
  }
});

module.exports = router;
