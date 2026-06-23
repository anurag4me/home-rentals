import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import Footer from "../components/Footer";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const [propertyList, setPropertyList] = useState([]);
  const user = useSelector((state) => state.user);

  const getPropertyList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${user._id}/properties`
      );
      const data = await response.json();
      setPropertyList(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  async function deleteHomeListing (listing) {
    setPropertyList(prev =>
      prev.filter(r => r._id !== listing._id)
    );
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="text-3xl text-blue-950 font-800 font-semibold title-list">
        Your Property List
      </h1>
      <div className="list">
        {propertyList.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <PropertyCard
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
              onDelete={deleteHomeListing}
              key={_id}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default PropertyList;
