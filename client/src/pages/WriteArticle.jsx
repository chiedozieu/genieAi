import { Edit, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from 'markdown-to-jsx'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (801-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];
  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;
      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt, length: selectedLength.length },
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
        </div>{" "}
        <br />
        <button
          disabled={loading}
          className="w-full flex items-center gap-2 rounded-md justify-center text-white bg-gradient-to-r from-[#0395f0]  to-[#015fca] py-2 px-4 cursor-pointer group hover:bg-gradient-to-r hover:from-[#015fca] hover:to-[#0395f0]"
        >
          {loading ? (
            <span className="size-4 my-1 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
          ) : (
            <div className="flex items-center gap-2">
              <Edit className="w-5 group-hover:-translate-x-0.5 transition duration-600" />
              Generate Article
            </div>
          )}
        </button>
      </form>

      {/* right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200/50 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Edit className="size-5 text-sky-500" />
          <h1 className="text-xl font-semibold"> Generate Article </h1>
        </div>
        {!content ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-sm flex flex-col items-center gap-5">
              <Edit className="size-9" />
              <p className="text-gray-600">Enter topic to generate article</p>
            </div>
          </div>
        ) : (
          <div className="mt-4 h-full overflow-y-scroll text-sm text-slate-600">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteArticle;
