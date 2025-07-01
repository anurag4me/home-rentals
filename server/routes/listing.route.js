const router = require("express").Router();
const multer = require("multer");
const Listing = require("../models/listing.model");

/* Configuration Multer for file upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* CREATE LISTING */
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    /* Take the information from the form */
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files;
    if (!listingPhotos) return res.status(400).send("No file uploaded.");

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = await Listing.create({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    res.status(200).json(newListing);
  } catch (err) {
    res
      .status(409)
      .send({ message: "Failed to create listing", error: err.message });
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await Listing.find({}).populate("creator");
    }
    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .send({ message: "Failed to fetch listings", error: err.message });
    console.log(err);
  }
});

/* LISTING DETAILS */
router.get('/:listingId', async (req, res) => {
  try{
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate("creator");
    res.status(202).json(listing);
  } catch (err) {
    res
      .status(404)
      .send({ message: "Listing can not found!", error: err.message });
  }
})

module.exports = router;
