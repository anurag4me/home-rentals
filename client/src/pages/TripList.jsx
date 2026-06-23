import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const [tripLists, setTripLists] = useState([]);


  const userId = useSelector((state) => state.user?._id);

  const getTripList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/trips`
      );
      const data = await response.json();
      if(response.ok)
        setTripLists(data.trips);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="text-3xl text-blue-950 font-800 font-semibold title-list">Your Trip List</h1>
      <div className="list">
        {tripLists?.map(({ _id, host, listing, startDate, endDate, totalPrice, booking=true }, index) => (
          <ListingCard
            listingId={listing._id}
            creator={host}
            listingPhotoPaths={listing.listingPhotoPaths}
            city={listing.city}
            province={listing.province}
            country={listing.country}
            category={listing.category}
            type={listing.type}
            price={listing.price}
            startDate={startDate}
            endDate={endDate}
            totalPrice={totalPrice}
            booking={booking}
            key={index}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default TripList;
