require("dotenv").config();
const express = require("express");
const mongoDbConnect = require("./connection");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () =>
  console.log(`Sever Started Successfully at Port: ${PORT}`)
);
