import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

const AiTool = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  return (
    <div className="p-4 sm:px-20 xl:px-32 my-24">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-gray-700">Ai Tools</h2>
        <p className="mt-1 max-w-xs sm:max-w-lg mx-auto 2xl:max-w-xl max:sm:text-xs text-gray-600">
          Bring your ideas to life - start creating now!"
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {AiToolsData.map((tool, index) => (
          <div
            onClick={() => (user ? navigate(tool.path) : openSignIn())}
            key={index}
            className="bg-white rounded-lg shadow-md p-8 hover:scale-105 transition-all duration-700 cursor-pointer"
          >
            <tool.Icon
              className="size-12 text-white rounded-full p-3"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            />
            <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-6">
              {tool.title}
            </h3>
            <p className="mt-2 text-gray-600 max-w-[95%]">{tool.description}</p>
            <button
              // onClick={() => navigate("/ai")}
              className="border border-gray-400 mt-8 mb text-gray-600 w-full flex items-center justify-center px-10 py-3 rounded-md cursor-pointer hover:bg-primary   hover:text-white"
            >
              Start Creating
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTool;
