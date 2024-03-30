const { createProduct, updateProduct, deleteProduct, getProduct, getProducts } = require("../controllers/product.controller");
const { verifyAdmin } = require("../middlewares/verifyToken");
const {parser} = require("../utils/cloudinary.js");

const router = require("express").Router();

router.post("/", verifyAdmin, parser.single("image"), createProduct);
router.put("/:id", verifyAdmin, parser.single("image"), updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);
router.get("/:id", verifyAdmin, getProduct);
router.get("/", verifyAdmin, getProducts);

module.exports = router;