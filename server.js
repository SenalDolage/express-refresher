const express = require("express");
const app = express();
app.set("view engine", "ejs");

// Apply the logger middleware to all routes
app.use(logger);
// Middleware to parse URL-encoded bodies 
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { text: "hi" });
});

const userRouter = require("./routes/users");

app.use("/users", userRouter);

// Custom middleware to log request URLs
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
