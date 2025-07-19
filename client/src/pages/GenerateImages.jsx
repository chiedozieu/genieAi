import { Image, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in the ${selectedStyle} style`;
      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
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
                selectedStyle === style ? "bg-[#00AD25] text-white" : ""
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
        <button
          disabled={loading}
          type="submit"
          className="w-full flex items-center gap-2 rounded-md justify-center text-white bg-gradient-to-r from-[#00AD25]  to-[#01ec1c] py-2 px-4 cursor-pointer group hover:bg-gradient-to-r hover:from-[#01ec1c] hover:to-[#00AD25]"
        >
          {loading ? (
            <span className="size-4 my-1 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
          ) : (
            <div className="flex items-center gap-2">
              <Image className="w-5 group-hover:-translate-x-0.5 transition duration-300" />
              Generate Image
            </div>
          )}
        </button>
      </form>

      {/* right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200/50 min-h-96">
        <div className="flex items-center gap-3">
          <Image className="size-5 text-[#00AD25]" />
          <h1 className="text-xl font-semibold"> Generated Images </h1>
        </div>
        {!content ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-sm flex flex-col items-center gap-5">
              <Image className="size-9" />
              <p className="text-gray-600">Enter topic to generate Image</p>
            </div>
          </div>
        ) : (
          
            <div className="mt-3 h-full">
              <img src={content} alt="image" className="w-full h-full" />
            </div>
          
        )}
      </div>
    </div>
  );
};

export default GenerateImages;
