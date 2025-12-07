const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();

let refreshTokens = [];

// Login route to authenticate user and provide tokens
router.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  // Generate an access token and a refresh token
  const accessToken = jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: "15s",
  });
  const refreshToken = jwt.sign(user, process.env.RE_TOKEN_KEY, {
    expiresIn: "24h",
  });

  refreshTokens.push(refreshToken);

  res.send({ accessToken, refreshToken });
});

// Route to generate a new access token using a refresh token
router.post("/token", (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.RE_TOKEN_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    // Generate a new access token
    const accessToken = jwt.sign(
      { name: user.name },
      process.env.TOKEN_SECRET,
      { expiresIn: "15s" }
    );
    res.send({ accessToken });
  });
});

// Logout route to invalidate the refresh token
router.delete("/logout", (req, res) => {
  const refreshToken = req.body.refreshToken;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.sendStatus(204);
});

module.exports = router;
