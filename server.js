const express = require("express");
const app = express();
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const protectedRoute = require("./routes/protectedRoute");
// Logger
app.use(morgan("tiny"));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/protected", protectedRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
