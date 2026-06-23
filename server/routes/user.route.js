const router = require("express").Router();

const Booking = require("../models/booking.model");
const Listing = require("../models/listing.model");
const User = require("../models/user.model");

/*  GET TRIP LIST */
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ guest: userId }).populate("guest", "-password").populate("host listing");
    res.status(200).json({trips});
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to find trips!", error: err.message });
  }
});

/* ADD Listing TO WISHLIST */
router.patch("/:userId/wishlist/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator", "-password");

    const favoriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );
    if (favoriteListing) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();
      res.status(200).json({
        message: "Listing is removed from wish list",
        wishList: user.wishList,
      });
    } else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({
        message: "Listing is added to wish list",
        wishList: user.wishList,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

/*  GET PROPERTY LIST */
router.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ creator: userId }).populate("creator", "-password");
    res.status(200).json(properties);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to find properties!", error: err.message });
  }
});

/* DELETE PROPERTY LIST */
router.delete("/:userId/delete/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const listing = await Listing.findByIdAndDelete(listingId);
    res.status(200).json({listing});
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed delete property!", error: err.message });
  }
})

/*  GET RESERVATION LIST */
router.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ host: userId }).populate("guest", "-password").populate("host listing");
    res.status(200).json(reservations);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to fetch reservations!", error: err.message });
  }
});

/* UPDATE STATUS */
router.patch("/reservations/:reservationId/status", async(req, res) => {
  const { status } = req.body;
  const allowedStatuses = [
    "pending",
    "confirmed",
    "cancelled",
    "completed"
  ];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid status"
    });
  }
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.reservationId, { status }, { new: true }).populate("guest", "-password").populate("host listing");

    if (!booking) {
      return res.status(404).json({
        message: "Reservation not found"
      });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = router;
