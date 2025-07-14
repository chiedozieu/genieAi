import { Captions, Edit, Image, Sparkles } from "lucide-react";
import React, { useState } from "react";

const GenerateImages = () => {
   const imageStyle = ['Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantasy style', 'Realistic style', '3D style', 'Portrait style'];
  
     const [selectedStyle, setSelectedStyle] = useState('Realistic');
     const [input, setInput] = useState("");
     const [publish, setPublish] = useState(false);
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
          <Sparkles className="w-5 text-[#00AD25]" />
          <h1>AI Image Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Describe your image</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm border border-gray-300/50 rounded-lg"
          placeholder="Describe your image..."
          required
        />
        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {imageStyle.map((style) => (
            <span
              onClick={() => setSelectedStyle(style)}
              key={style}
              className={`text-sm py-1 px-2 border-[#00AD25] border rounded-full cursor-pointer ${
                selectedStyle === style
                  ? "bg-[#00AD25] text-white"
                  : ""
              }`}
            >
              {style}
            </span>
          ))}
        </div>{" "}

        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
          <input
            type="checkbox"
            checked={publish}
            className="sr-only peer"
            onChange={(e) => setPublish(e.target.checked)}
          />
          <div className="w-9 h-5 bg-slate-300 peer-checked:bg-[#00AD25] duration-300 ease-in-out rounded-full transition"></div>
          <span className="absolute left-1 top-1 bg-white w-3 h-3 rounded-full peer-checked:translate-x-4  transition duration-300 ease-in-out"></span>
          </label>
          <p className="text-sm">Make it public</p>
        </div>

      
        <button className="w-full flex items-center gap-2 rounded-md justify-center text-white bg-gradient-to-r from-[#00AD25]  to-[#015fca] py-2 px-4 cursor-pointer group hover:bg-gradient-to-r hover:from-[#0395f0] hover:to-[#00AD25]">
          <Image className="w-5 group-hover:-translate-x-0.5 transition duration-300" />
          <span className="">Generate Image</span>
        </button>
      </form>

      {/* right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200/50 min-h-96">
        <div className="flex items-center gap-3">
          <Image className="size-5 text-[#00AD25]" />
          <h1 className="text-xl font-semibold"> Generated Images </h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-sm flex flex-col items-center gap-5">
            <Image className="size-9" />
            <p className="text-gray-600">Enter topic to generate Image</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenerateImages