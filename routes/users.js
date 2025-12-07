const express = require("express");
const router = express.Router();

router.get("/all", (req, res) => {
  res.send("All users");
});

router.get("/new", (req, res) => {
  res.render("users/new", { firstName: "Test" });
});

router.post("/", (req, res) => {
  //   res.send("Create user");
  users.push({ name: req.body.firstName });
  res.redirect(`users/${users.length - 1}`);
});

router
  .route("/:id")
  .get((req, res) => {
    res.send(`get ${users[req.params.id].name} ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`update ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`delete ${req.params.id}`);
  });

const users = [{ name: "kel" }, { name: "sal" }];
// middleware that runs for routes with :id
router.param("id", (req, res, next, id) => {
  req.user = users[id];
  next();
});

module.exports = router;
