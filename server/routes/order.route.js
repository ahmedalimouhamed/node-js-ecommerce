const { createOrder, updateOrder, deleteOrder, getOrder, getUserOrders, getOrders, getMonthlyIncome } = require("../controllers/order.controller");
const { verifyAdmin } = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post("/", verifyAdmin, createOrder);
router.put("/:id", verifyAdmin, updateOrder);
router.delete("/:id", verifyAdmin, deleteOrder);
router.get("/:id", verifyAdmin, getOrder);
router.get("/user/:id", verifyAdmin, getUserOrders);
router.get("/", verifyAdmin, getOrders);
router.get("/stats/incomes", verifyAdmin, getMonthlyIncome);

module.exports = router;