const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const user = req.user;
  res.json(user);
  //   res.json([
  //     { id: 1, name: "John Doe", age: 20 },
  //     { id: 2, name: "Jane Smith", age: 22 },
  //   ]);
});

module.exports = router;
