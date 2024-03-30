const { updateUser, deleteUser, getAdmin, getAllUsers, getUserStats } = require("../controllers/user.controller");
const {verifyToken, verifyAdmin} = require("../middlewares/verifyToken");

const router = require("express").Router();

router.get("/get-user", (req, res) => {
  res.send("user has been getten")
});

router.put("/:id", verifyToken, updateUser)
router.delete("/:id", verifyAdmin, deleteUser)
router.get("/admin/:id", verifyAdmin, getAdmin)
router.get("/", verifyAdmin, getAllUsers)
router.get("/stats", verifyAdmin, getUserStats)

module.exports = router