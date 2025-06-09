const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/user.model");

/* Configuration Multer for file uploading */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded file in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/* USER REGISTER */
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    /* Take all the information the from the form */
    const { firstName, lastName, email, password } = req.body;

    /* The upload file is available as req.file*/
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    /* path to the uploaded profile photo */
    const profileImagePath = profileImage.path;

    /* Check if user exists */
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists!" });

    /* Hash the password */
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    /* Create a new User */
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    /* Send a successful message */
    res
      .status(200)
      .json({ message: "User register successfully!", user: newUser });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed!", error: err.message });
  }
});

/* USER LOGIN */
router.post("/login", async (req, res) => {
  try {
    /* Take all the information the from the form */
    const { email, password } = req.body;

    /* Check if user exists */
    const user = await User.findOne({ email });
    if (!user)
      return res.status(409).json({ message: "User doesn't exists! Please sign in" });

    /* Compare the password with the hashed password */
    const isMatch = bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({message: "Invalid email or password!"})

    /* Generate JWT token */
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

    /* Send a successful message */
    delete user.password
    res
      .status(200)
      .json({ message: "User logged successfully!", token, user });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Login failed!", error: err.message });
  }
});

module.exports = router;
