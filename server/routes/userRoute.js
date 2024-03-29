const router = require("express").Router();

router.get("/get-user", (req, res) => {
  res.send("user has been getten")
});

module.exports = router