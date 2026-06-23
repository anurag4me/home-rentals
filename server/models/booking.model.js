const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },

    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "listing",
      required: true
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    guestsCount: {
      type: Number,
      required: true,
      min: 1
    },

    pricePerNight: {
      type: Number,
      required: true
    },

    totalNights: {
      type: Number,
      required: true
    },

    totalPrice: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);


const Booking = mongoose.model("booking", bookingSchema);
module.exports = Booking;
