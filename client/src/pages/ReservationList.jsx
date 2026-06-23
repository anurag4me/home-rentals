import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ReservationCard from "../components/ReservationCard";
import Footer from "../components/Footer";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const [reservationList, setReservationList] = useState([]);
  const user = useSelector((state) => state.user);

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${user._id}/reservations`
      );
      const data = await response.json();
      setReservationList(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch all reservations failed", err.message);
    }
  };

  useEffect(() => {
    getReservationList();
  }, [reservationList]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="text-3xl text-blue-950 font-800 font-semibold title-list">
        Your Reservation List
      </h1>
      <div className="list">
        {reservationList?.map(({ _id, guest, listing, startDate, endDate, guestsCount, pricePerNight, totalNights, totalPrice, status }) => (
          <ReservationCard
            reservationId={_id}
            guest={guest}
            listing={listing}
            startDate={startDate}
            endDate={endDate}
            guestsCount={guestsCount}
            totalPrice={totalPrice}
            status={status}
            key={_id}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;
