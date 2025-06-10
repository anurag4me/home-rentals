import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/state";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(setLogout());
  }

  return (
    <div className="w-full flex justify-between items-center px-16 py-3 relative">
      <a href="/">
        <img className="w-25" src="/assets/logo.png" alt="logo" />
      </a>

      <div className="border border-gray-600 h-10 flex items-center gap-10 rounded-4xl py-0 px-5">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none border-none"
        />
        <IconButton>
          <Search className="text-red-600" />
        </IconButton>
      </div>

      <div className="flex items-center gap-5">
        {user ? (
          <a href="/create-listing">Become A Host</a>
        ) : (
          <a href="/login">Become A Host</a>
        )}

        <button
          className="h-12 flex items-center px-3 py-0 border border-gray-600 rounded-4xl gap-3 bg-white cursor-pointer"
          onClick={() => setDropDownMenu(!dropDownMenu)}
        >
          <Menu className="w-[200px] text-gray-600 bg-white flex flex-col" />
          {!user ? (
            <Person className="text-gray-600" />
          ) : (
            <img
              src={`http://localhost:3000/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              className="w-10 h-10 object-cover rounded-full"
            ></img>
          )}
        </button>

        {dropDownMenu && !user && (
          <div className="w-50 flex flex-col justify-center absolute top-18 right-15 py-2 shadow-xl/30 rounded-3xl overflow-hidden">
            <Link to="/login" className="w-full px-4 py-2 font-medium hover:bg-gray-200 hover:text-red-500">Log In</Link>
            <Link to="/register" className="w-full px-4 py-2 font-medium hover:bg-gray-200 hover:text-red-500">Sign Up</Link>
          </div>
        )}
        {dropDownMenu && user && (
          <div className="w-50 flex flex-col justify-center absolute top-18 right-15 py-2 shadow-xl/30 rounded-3xl overflow-hidden">
            <Link
              to=""
              className="w-full px-4 py-2 font-medium hover:bg-gray-200 hover:text-red-500"
            >
              Trip List
            </Link>
            <Link
              to=""
              className="w-full px-4 py-2 font-medium hover:bg-gray-200 hover:text-red-500"
            >
              Wish List
            </Link>
            <Link
              to=""
              className="w-full px-4 py-2 font-medium hover:bg-gray-200 hover:text-red-500"
            >
              Property List
            </Link>
            <Link
              to=""
              className="w-full px-4 py-2 font-medium hover:bg-gray-200 hover:text-red-500"
            >
              Reservation List
            </Link>
            <Link
              to=""
              className="w-full px-4 py-2 font-medium hover:bg-gray-200 hover:text-red-500"
            >
              Become A Host
            </Link>
            <Link
              to="/login"
              className="w-full px-4 py-2 font-medium hover:bg-gray-200 hover:text-red-500"
              onClick={handleLogout}
            >
              Log out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
