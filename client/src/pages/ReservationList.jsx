import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { setReservationList } from "../redux/state";
import Footer from "../components/Footer";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const reservationList = user?.reservationList;

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${user._id}/reservations`
      );
      const data = await response.json();

      dispatch(setReservationList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch all reservations failed", err.message);
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="text-3xl text-blue-950 font-800 font-semibold title-list">
        Your Reservation List
      </h1>
      <div className="list">
        {reservationList?.map(({ listing, host, startDate, endDate, totalPrice, booking=true }) => (
          <ListingCard
            listingId={listing._id}
            creator={host}
            listingPhotoPaths={listing.listingPhotoPaths}
            city={listing.city}
            province={listing.province}
            country={listing.country}
            category={listing.category}
            startDate={startDate}
            endDate={endDate}
            totalPrice={totalPrice}
            booking={booking}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;
