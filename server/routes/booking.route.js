const router = require("express").Router();

const Booking = require("../models/booking.model");

/* CREATE BOOKING */
router.post("/create", async (req, res) => {
  try {
    const { guest, host, listing, startDate, endDate, guestsCount, pricePerNight, totalNights, totalPrice } =
      req.body;
    const newBooking = await Booking.create({
      guest,
      host,
      listing,
      startDate,
      endDate,
      guestsCount,
      pricePerNight,
      totalNights,
      totalPrice,
    });

    res.status(200).json({ newBooking });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Fail to create a new Booking!", error: err.message });
  }
});

module.exports = router;
