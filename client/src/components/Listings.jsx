import React, { useEffect, useState } from "react";
import { categories } from "../data";
import Loader from "./Loader";
import { setListings } from "../redux/state";
import { useDispatch, useSelector } from "react-redux";
import ListingCard from "./ListingCard";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory != "All"
          ? `http://localhost:3000/properties?category=${selectedCategory}`
          : "http://localhost:3000/properties"
      );
      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-1 py-12 px-15">
        {categories?.map((category, index) => (
          <div
            key={index}
            className={`p-6 flex flex-col items-center text-gray-400 ${
              selectedCategory == category.label && "text-red-500"
            } hover:text-red-500`}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="text-3xl">{category.icon}</div>
            <p className="text-lg font-semibold ">{category.label}</p>
          </div>
        ))}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-center gap-1.5 py-12 px-15">
          {listings.map(
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
              booking=false
            }, index) => (
              <ListingCard
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
                key={index}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
