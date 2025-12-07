const express = require("express");
const app = express();
const PORT = 3000;
const user = require("./routes/user");
const student = require("./routes/student");
const auth = require("./middleware/auth");

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api/user", user);
app.use("/api/student", auth, student);

app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
