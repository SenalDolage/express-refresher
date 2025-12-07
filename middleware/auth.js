const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware function to authenticate JWT tokens and protect routes
module.exports = function (req, res, next) {
  // Check for the token in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("bearer")
  ) {
    // Extract the token from the header
    const token = req.headers.authorization.split(" ")[1];

    // If no token is found, return 401 Unauthorized
    if (!token) return res.sendStatus(401);

    // Verify the token using the secret key from environment variables
    // If valid, attach the user info to the request object
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      // If token is invalid or expired, return 403 Forbidden
      if (err) return res.sendStatus(403);

      // Attach user information to the request object for downstream use
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
