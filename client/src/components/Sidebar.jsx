import React from "react";
import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Captions,
  Eraser,
  FileText,
  Home,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: Home },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Captions },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="my-7 w-full">
        <img
          src={user?.imageUrl}
          alt="user avatar"
          className="size-13 mx-auto rounded-full"
        />
        <h1 className="text-center mt-1">{user?.fullName}</h1>
        <div className="px-6 mt-5 text-gray-600 text-sm font-medium">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              to={to}
              key={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded group hover:bg-gray-100 ${
                  isActive
                    ? "bg-gradient-to-r from-[#06d3c5] to-[#029db1] text-white"
                    : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`size-4 ${isActive ? "text-white" : ""} group-hover:animate-bounce transition-all duration-700`} />
                  <span className={`text-sm ${isActive ? "text-white" : ""}`}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="w-full border-t border-gray-300/50 p-4 px-7 flex items-center justify-between">
        <div
          onClick={openUserProfile}
          className="flex gap-2 items-center cursor-pointer"
        >
          <img
            src={user?.imageUrl}
            className="size-8 rounded-full"
            alt="user"
          />
          <div className="">
            <h1 className="text-sm font-light">{user?.fullName}</h1>
            <p className="text-xs text-gray-500 font-extralight">
                <Protect plan="premium" fallback="Free">Premium </Protect>
                Plan
            </p>
          </div>
        </div>
        <LogOut
          onClick={signOut}
          className="cursor-pointer w-4.5 text-gray-600 hover:translate-x-1 transition-all duration-700"
        />
      </div>
    </div>
  );
};

export default Sidebar;
