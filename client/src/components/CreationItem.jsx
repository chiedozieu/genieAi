import React, { useState } from "react";
// import Markdown from "react-markdown";
import Markdown from 'markdown-to-jsx'

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="max-w-5xl p-4 text-sm bg-white order-gray-200/50 rounded-lg cursor-pointer"
    >
      <div className="flex justify-between items-center gap-4">
        <div className="">
          <h2>{item.prompt}</h2>
          <p className="text-gray-500">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full">
          {item.type}
        </button>
      </div>
      {expanded && (
        <div className="">
          {item.type === "image" ? (
            <div className="">
              <img
                src={item.content}
                alt="image"
                className="mt-3 max-w-md w-full"
              />
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
