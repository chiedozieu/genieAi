import { Captions, Edit, Sparkles } from "lucide-react";
import React, { useState } from "react";

const BlogTitles = () => {
 const blogCategories = ['General', 'Technology', 'Health', 'Business', 'Lifestyle', 'Education', 'Travel', 'Food'];

   const [selectedCategory, setSelectedCategory] = useState('General');
   const [input, setInput] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };
  return (
     <div className="h-full overflow-y-scroll p-4 flex items-start flex-wrap gap-2 to-slate-700">
      {/* left column */}
      <form
        onSubmit={onSubmitHandler}
        action=""
        className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200/50"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 text-[#8E37EB]" />
          <h1>AI Title Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Keyword</p>
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
        <p className="mt-4 text-sm font-medium">Category</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {blogCategories.map((category) => (
            <span
              onClick={() => setSelectedCategory(category)}
              key={category}
              className={`text-sm py-1 px-2 border-[#8E37EB] border rounded-full cursor-pointer ${
                selectedCategory === category
                  ? "bg-[#8E37EB] text-white"
                  : ""
              }`}
            >
              {category}
            </span>
          ))}
        </div>{" "}
        <br />
        <button className="w-full flex items-center gap-2 rounded-md justify-center text-white bg-gradient-to-r from-[#8E37EB]  to-[#015fca] py-2 px-4 cursor-pointer group hover:bg-gradient-to-r hover:from-[#0395f0] hover:to-[#8E37EB]">
          <Edit className="w-5 group-hover:-translate-x-0.5 transition duration-300" />
          <span className="">Generate Title</span>
        </button>
      </form>

      {/* right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200/50 min-h-96">
        <div className="flex items-center gap-3">
          <Captions className="size-5 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold"> Generated Titles </h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-sm flex flex-col items-center gap-5">
            <Captions className="size-9" />
            <p className="text-gray-600">Enter topic to generate Title</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default BlogTitles;
