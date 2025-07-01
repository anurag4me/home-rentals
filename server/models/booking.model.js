const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "listing",
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
}, {timestamps: true});


const Booking = mongoose.model("booking", bookingSchema);
module.exports = Booking;
