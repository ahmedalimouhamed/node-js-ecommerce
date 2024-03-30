const { createCart, updateCart, deleteCart, getCartItem, getUserCartItems, getCartItems } = require("../controllers/cart.controller");
const { verifyAdmin } = require("../middlewares/verifyToken");
const {parser} = require("../utils/cloudinary.js");

const router = require("express").Router();

router.post("/", verifyAdmin, parser.single("image"), createCart);
router.put("/:id", verifyAdmin, parser.single("image"), updateCart);
router.delete("/:id", verifyAdmin, deleteCart);
router.get("/:id", verifyAdmin, getCartItem);
router.get("/user/:id", verifyAdmin, getUserCartItems);
router.get("/", verifyAdmin, getCartItems);

module.exports = router;