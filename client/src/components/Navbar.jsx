import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { ArrowBigRight } from "lucide-react";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  return (
    <div className="fixed w-full z-5 backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-32 sm:w-40" />
      </Link>
      {user ? (
        <UserButton />
      ) : (
        <button onClick={openSignIn} className="flex items-center gap-2 rounded-full text-white bg-gradient-to-r from-[#12B7AC] via-cyan-600.5 to-[#08B6CE] py-2 px-4 cursor-pointer">
          Get Started <ArrowBigRight className="size-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
