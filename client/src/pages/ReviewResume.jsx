import { FileText, Sparkles } from "lucide-react";
import React, { useState } from "react";

const ReviewResume = () => {
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
          <Sparkles className="w-5 text-[#ff4af6]" />
          <h1>Resume Review</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Resume</p>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          accept="application/pdf*"
          type="file"
          className="w-full p-2 px-3 mt-2 outline-none text-sm border border-gray-300/50 rounded-lg text-gray-600"
          required
        />
        <p className="text-xs text-gray-500 font-light mt-1">Supports PDF formats only</p>

       

        <button className="w-full flex items-center gap-2 mt-6 rounded-md justify-center text-white bg-gradient-to-r from-[#ff4af6]  to-[#e610d0] py-2 px-4 cursor-pointer group hover:bg-gradient-to-r hover:from-[#e610d0] hover:to-[#ff4af6]">
          <FileText className="w-5 group-hover:-translate-x-0.5 transition duration-300" />
          <span className="">Review Resume</span>
        </button>
      </form>

      {/* right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200/50 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <FileText className="size-5 text-[#ff4af6]" />
          <h1 className="text-xl font-semibold"> Reviewed Resume </h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-sm flex flex-col items-center gap-5">
            <FileText className="size-9" />
            <p className="text-gray-600">
              Upload resume and click the button to review your resume
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewResume