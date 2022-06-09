const express = require("express");
const auth = require("../middlewares/auth.js");
const router = express.Router();
const Order = require("../controllers/order_controller.js");

router.post("/order/create", Order.createOrder);
router.get("/order/all", Order.getAllOrders);
router.get("/order/:id", Order.getOneOrder);
router.put("/order/update/:id", auth, Order.updateOneOrder);
router.delete("/order/delete/:id", auth, Order.deleteOneOrder);

module.exports = router;
