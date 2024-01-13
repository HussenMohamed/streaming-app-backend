const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const authRoutes = require("./routes/auth");
const protectedRoute = require("./routes/protectedRoute");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");

app.use(cookieParser());
// Logger
app.use(morgan("tiny"));
app.use(express.json());
app.use(credentials);

app.use(cors(corsOptions));
// built-in middlware to handle form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Hello");
});
app.use("/auth", authRoutes);
app.use("/protected", protectedRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
