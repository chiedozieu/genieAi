import { FileText, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import Markdown from "markdown-to-jsx";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", input);
      const { data } = await axios.post("/api/ai/review-resume", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
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
        <p className="text-xs text-gray-500 font-light mt-1">
          Supports PDF formats only
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center gap-2 mt-6 rounded-md justify-center text-white bg-gradient-to-r from-[#ff4af6]  to-[#e610d0] py-2 px-4 cursor-pointer group hover:bg-gradient-to-r hover:from-[#e610d0] hover:to-[#ff4af6]"
        >
          {loading ? (
            <span className="size-4 my-1 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
          ) : (
            <div className="flex items-center gap-2">
              <FileText className="w-5 group-hover:-translate-x-0.5 transition duration-300" />
              Review Resume
            </div>
          )}
        </button>
      </form>

      {/* right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200/50 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <FileText className="size-5 text-[#ff4af6]" />
          <h1 className="text-xl font-semibold"> Reviewed Resume </h1>
        </div>
        {
          !content ? (
             <div className="flex-1 flex items-center justify-center">
          <div className="text-sm flex flex-col items-center gap-5">
            <FileText className="size-9" />
            <p className="text-gray-600">
              Upload resume and click the button to review your resume
            </p>
          </div>
        </div>
          ) : (
           <div className="mt-4 h-full overflow-y-scroll text-sm text-slate-600">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
          )
        }
       
      </div>
    </div>
  );
};

export default ReviewResume;
