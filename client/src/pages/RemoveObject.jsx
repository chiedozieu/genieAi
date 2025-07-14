import { Captions, Edit, Eraser, Scissors, Sparkles } from "lucide-react";
import React, { useState } from "react";

const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [object, setObject] = useState("");
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
          <Sparkles className="w-5 text-[#4a7aff]" />
          <h1>Object Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload your image</p>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          accept="image/*"
          type="file"
          className="w-full p-2 px-3 mt-2 outline-none text-sm border border-gray-300/50 rounded-lg text-gray-600"
          required
        />

        <p className="mt-6 text-sm font-medium">Describe object to be removed</p>
        <textarea
          onChange={(e) => setObject(e.target.value)}
          value={object}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm border border-gray-300/50 rounded-lg"
          placeholder="e.g watch, phone... only a single object"
          required
        />

        <button className="w-full flex items-center gap-2 mt-6 rounded-md justify-center text-white bg-gradient-to-r from-[#417df6]  to-[#8e37eb] py-2 px-4 cursor-pointer group hover:bg-gradient-to-r hover:from-[#8e37eb] hover:to-[#417df6]">
          <Scissors className="w-5 group-hover:-translate-x-0.5 transition duration-300" />
          <span className="">Remove Object</span>
        </button>
      </form>

      {/* right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200/50 min-h-96">
        <div className="flex items-center gap-3">
          <Scissors className="size-5 text-[#417df6]" />
          <h1 className="text-xl font-semibold"> Processed Image </h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-sm flex flex-col items-center gap-5">
            <Scissors className="size-9" />
            <p className="text-gray-600">
              Upload an image and click the button to remove the object
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;
