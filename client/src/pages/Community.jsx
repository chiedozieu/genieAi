import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <div className="">
      <div className="bg-white p-4 my-4">
        <p className="text-sm font-extrabold text-gray-700">
          Be inspired by the art and imagination of our community
        </p>
      </div>
      <div className="bg-white w-full h-full rounded-xl overflow-y-scroll">
        {creations?.map((creation, index) => (
          <div
            className="relative group inline-block pl-3 pt-3 w-full sm:w-1/2 lg:w-1/3"
            key={index}
          >
            <img
              src={creation.content}
              alt=""
              className="w-full h-full object-cover rounded-lg p-2"
            />
            <div className="absolute bottom-0 top-0 right-0 left-3 text-white flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 rounded=lg">
              <p className="text-sm hidden group-hover:block">
                {creation.prompt}
              </p>
              <div className="flex gap-1 items-center">
                <p className="">{creation.likes.length}</p>
                <Heart
                  className={`min-w-5 h-5 hover:scale-110 transition duration-300 cursor-pointer ${
                    creation.likes.includes(user.id)
                      ? "text-red-600 fill-red-500"
                      : "text-white"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
