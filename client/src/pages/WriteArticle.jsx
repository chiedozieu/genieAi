import { Edit, Sparkles } from "lucide-react";
import React, { useState } from "react";

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (801-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];
  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
  }
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 to-slate-700">
      {/* left column */}
      <form
      onSubmit={onSubmitHandler}
        action=""
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200/50"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 text-sky-500" />
          <h1>Article Configuration</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Article Topic</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          name=""
          id=""
          className="w-full p-2 px-3 mt-2 outline-none text-sm border border-gray-300/50 rounded-lg"
          placeholder="The topic of your article..."
          required
        />
        <p className="mt-4 text-sm font-medium">Article Length</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {articleLength.map((length, index) => (
            <span
              onClick={() => setSelectedLength(length)}
              key={index}
              className={`text-sm py-1 px-4 border-sky-500 border rounded-full cursor-pointer ${
                selectedLength.length === length.length
                  ? "bg-sky-500 text-white"
                  : ""
              }`}
            >
              {length.text}
            </span>
          ))}
        </div> <br />
        <button className="w-full flex items-center gap-2 rounded-md justify-center text-white bg-gradient-to-r from-[#0395f0]  to-[#015fca] py-2 px-4 cursor-pointer group hover:bg-gradient-to-r hover:from-[#015fca] hover:to-[#0395f0]">
          <Edit className="w-5 group-hover:-translate-x-0.5 transition duration-300"/>
          <span className="">Generate Article</span>
        </button>
      </form>

      {/* right column */}
      <div className="text-xl font-semibold"></div>
    </div>
  );
};

export default WriteArticle;
