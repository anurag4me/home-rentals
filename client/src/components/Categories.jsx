import React from "react";
import { categories } from "../data";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="py-12 px-14 flex flex-col items-center text-center bg-gray-200 sm:px-5">
      <h1 className="text-3xl text-blue-950 font-800 mb-4 font-bold">
        Explore Top Categories
      </h1>
      <p className="max-w-[700px] text-2xl">
        Explore our wide range of vacation rentals that cater to all types of
        travelers. Immerse yourself in the local culture. enjoy the comforts of
        home, and create unforgettable memories in your dream destination.
      </p>

      <div className="flex flex-wrap py-12 justify-center gap-5">
        {categories?.slice(1, 7).map((category, index) => (
          <Link to="" key={index}>
            <div className="relative flex justify-center items-center w-57 h-49 cursor-pointer">
              <img
                src={category.img}
                alt={category.label}
                className="absolute w-full h-full"
              />
              <div className="absolute w-full h-full bg-[#00000080] transition delay-150 ease-in-out hover:w-[80%] hover:h-[80%]"></div>
              <div className="relative text-white">
                <div className="text-[45px]">{category.icon}</div>
                <p className="font-semibold">{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
