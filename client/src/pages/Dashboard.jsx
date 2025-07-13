import { Gem, Sparkles } from "lucide-react";
import { dummyCreationData } from "../assets/assets";
import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  const getDashboardData = async () => {
    setCreations(dummyCreationData);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total Creations card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200/50">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-lg font-semibold">{creations?.length}</h2>
          </div>
          <div className="size-10 rounded-lg  bg-gradient-to-r from-[#3588F2] to-[#12B7AC] text-white flex items-center justify-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

         {/* Active Plan card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200/50">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-lg font-semibold">
              <Protect plan="premium" fallback="Free">Premium</Protect>
            </h2>
          </div>
          <div className="size-10 rounded-lg  bg-gradient-to-r from-[#9E533E] to-[#FF61C5] text-white flex items-center justify-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="mt-6 mb-4">Recent Creations</p>
        {
          creations.map((item) => (
            <CreationItem key={item.id} item={item} />
          ))
        }
      </div>
    </div>
  );
};

export default Dashboard;
