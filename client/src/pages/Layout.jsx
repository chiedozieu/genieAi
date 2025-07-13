import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { SignIn, useClerk } from "@clerk/clerk-react";

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  const { user } = useClerk();

  return user ? (
    
    <div className="flex flex-col justify-start items-start h-screen">
      <nav className="flex justify-between items-center w-full px-8 min-h-14 border-b border-gray-200/50">
        <Link to="/" className="w-32 sm:w-44">
          <img src={assets.logo} alt="" className="w-full"/>
        </Link>
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="size-6 text-gray-600 cursor-pointer sm:hidden"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="size-6 text-gray-600 cursor-pointer sm:hidden"
          />
        )}
      </nav>
      {/* left sidebar */}
      <div className="flex-1 flex w-full h-[calc(100vh-64px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 bg-[#F4F7FB]">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  )
};

export default Layout;
