require("dotenv").config();
const express = require("express");
const mongoDbConnect = require("./connection");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.route.js");
const bookingRoutes = require("./routes/booking.route.js");
const userRoutes = require("./routes/user.route.js");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoDbConnect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb Connected Successfully!"))
  .catch((err) => console.log("MongoDb error:", err));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/booking", bookingRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello World. Welcome to Home Rental API!"
  });
});
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

app.listen(PORT, () =>
  console.log(`Sever Started Successfully at Port: ${PORT}`)
);
