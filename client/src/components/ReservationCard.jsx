import { useState } from "react";
import "../styles/ListingCard.scss";
import {
  ArrowForwardIos,
  ArrowBackIosNew,
} from "@mui/icons-material";

const ReservationCard = ({
  reservationId,
  guest,
  listing,
  startDate,
  endDate,
  guestsCount,
  totalPrice,
  onUpdate,
  status,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listing.listingPhotoPaths.length) %
        listing.listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % listing.listingPhotoPaths.length
    );
  };

  const updateStatus = async (newStatus) => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:3000/users/reservations/${reservationId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        onUpdate(data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ordinary-card">
      <h3>{listing.title}</h3>
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listing.listingPhotoPaths.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:3000/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />

              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide();
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>

              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide();
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <p>
        Guest: {guest.firstName}{" "}{guest.lastName}
      </p>

      <p>
        {new Date(startDate).toDateString()}{" - "}{new Date(endDate).toDateString()}
      </p>

      <p>Guests: {guestsCount}</p>

      <p>
        Total: <span>${totalPrice}</span>
      </p>

      <p>Status: <strong>{status}</strong></p>

      <div className="actions">
        {status === "pending" && (
          <>
            <button
              className="approve"
              disabled={loading}
              onClick={() => updateStatus("confirmed")}
            >
              Approve
            </button>

            <button
              className="delete"
              disabled={loading}
              onClick={() => updateStatus("cancelled")}
            >
              Cancel
            </button>
          </>
        )}

        {status === "confirmed" && (
          <button
            className="complete"
            disabled={loading}
            onClick={() => updateStatus("completed")}
          >
            Mark Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;