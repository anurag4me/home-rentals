import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { facilities } from "../data";

import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import * as variables from "../styles/variables.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";

import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

function ListingDetails() {
  const [loading, setLoading] = useState(true);
  const [guestsCount, setGuestsCount] = useState(1);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const getLisitingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/properties/${listingId}`
      );
      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getLisitingDetails();
  }, []);


  /* BOOKING CALENDER */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // Update the selected date range when user makes a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / ( 1000 * 60 * 60 * 24 ); // Calculate the difference in day unit


/* SUBMIT BOOKING */
const user = useSelector((state) => state.user);

const navigate = useNavigate();

const handleSubmit = async () => {
  if(!user) {
    alert("Please log in first before booking");
    return;
  } else if(user?._id === listing.creator?._id) {
    alert("You cannot book your own listing");
    return;
  }
  try {
    const bookingForm = {
      customerId: user._id,
      hostId: listing.creator,
      listingId,
      startDate: start,
      endDate: end,
      guestsCount,
      pricePerNight: listing.price,
      totalNights: dayCount,
      totalPrice: listing.price * dayCount,
    }

    const response = await fetch("http://localhost:3000/booking/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingForm)
    })

    if(response.ok){
      navigate(`/${customerId}/trips`);
    }
  } catch (err) {
    console.log("Submit Booking Failed.", err.message);
  }
}

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="listing-details">
        <div className="title">
          <h1 className="text-3xl text-blue-950 font-800 font-semibold">{listing.title}</h1>
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item, index) => (
            <img
              src={`http://localhost:3000/${item.replace("public", "")}`}
              alt="listing photos"
              key={index}
            ></img>
          ))}
        </div>

        <h2 className="text-xl text-blue-950 font-800 font-semibold">
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.maxGuests} max guests - {listing.bedCount} bed -{" "}
          {listing.bathroomCount} bath
        </p>
        <hr />

        <div className="profile">
          <img
            src={`http://localhost:3000/${listing.creator.profileImagePath.replace(
              "public",
              ""
            )}`}
            alt="profile image"
          />
          <h3 className="text-2xl text-blue-950 font-800 font-semibold">
            Hosted By {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr/>

        <h2 className="text-xl text-blue-950 font-800 font-semibold">Description</h2>
        <p>{listing.description}</p>
        <hr />

        <h3 className="text-2xl text-blue-950 font-800 font-semibold">{listing.highlight}</h3>
        <p>{listing.hightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2 className="text-xl text-blue-950 font-800 font-semibold">What this place offers?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl text-blue-950 font-800 font-semibold mb-5">How long do you want to stay?</h2>
            <div className="date-range-calender">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2 className="text-xl text-blue-950 font-800 font-semibold">
                  ${listing.price} X {dayCount} nights
                </h2>
              ) : (
                <h2 className="text-xl text-blue-950 font-800 font-semibold">
                  ${listing.price} X {dayCount} night
                </h2>
              )}

              <h2 className="text-xl text-blue-950 font-800 font-semibold">Total price: ${listing.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>
              <div className="flex gap-5">
                <p>Number of Guests:</p>
                <div className="flex gap-3 items-center text-xl">
                  <RemoveCircleOutline
                    onClick={() => {
                      guestsCount > 1 && setGuestsCount(guestsCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                    className="mt-5"
                  />
                  <p>{guestsCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setGuestsCount(guestsCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                    className="mt-5"
                  />
                </div>
              </div>
              <button className='bg-red-600 text-white px-14 py-2 mt-4 rounded-xl cursor-pointer' type="submit" onClick={handleSubmit}>
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default ListingDetails;
