import { Eraser, Sparkles } from "lucide-react";
import React, { useState } from "react";

const RemoveBackground = () => {
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
          <Sparkles className="w-5 text-[#FF4938]" />
          <h1>Background Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload your image</p>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          accept="image/*"
          type="file"
          className="w-full p-2 px-3 mt-2 outline-none text-sm border border-gray-300/50 rounded-lg text-gray-600"
          required
        />
      <p className="text-xs text-gray-500 font-light mt-1">Supports JPG, JPEG, PNG, and  other image formats</p>

        <button className="w-full flex items-center gap-2 mt-6 rounded-md justify-center text-white bg-gradient-to-r from-[#FF4938]  to-[#ca015f] py-2 px-4 cursor-pointer group hover:bg-gradient-to-r hover:from-[#ca015f] hover:to-[#FF4938]">
          <Eraser className="w-5 group-hover:-translate-x-0.5 transition duration-300" />
          <span className="">Remove Background</span>
        </button>
      </form>

      {/* right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200/50 min-h-96">
        <div className="flex items-center gap-3">
          <Eraser className="size-5 text-[#FF4938]" />
          <h1 className="text-xl font-semibold"> Processed Image </h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-sm flex flex-col items-center gap-5">
            <Eraser className="size-9" />
            <p className="text-gray-600">Upload an image and click the button to remove the background</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveBackground