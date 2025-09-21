import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Loader from "./Loader";

const Hero = () => {
  const [prompt, setPrompt] = useState("");
  const [res, setRes] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ API Key from .env
  const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const generateResponse = async (e) => {
    setLoading(true);
    e.preventDefault(); // form submit reload se bachega
    try {
      const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

      const result =
        await model.generateContent(`You are a professional YouTube script writer.  
Write a complete script for the topic: "${prompt}".  

Guidelines:  
- Write the script line by line, like a narrator speaking.  
- Include "YOU:", "Scene:", timestamps, or headings.  
- Each line should be short, simple, and natural.  
- Maintain flow: Introduction → Hook → Explanation → Examples → Conclusion → Call-to-Action.  
- No long paragraphs. Just clear, engaging lines.  
`);
      const text = await result.response.text();
      setLoading(false);
      console.log(text);
      setRes(text);
    } catch (error) {
      setLoading(false);
      console.error("Error generating response:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-20">
      <h2 className="text-5xl font-bold text-[white] text-center ">
        A Free <span className="text-[#27E0B3]">AI</span> For Generating <br />{" "}
        The Video Script
      </h2>
      <form
        className="w-full flex flex-col items-center gap-5"
        onSubmit={generateResponse} // ✅ function call on submit
      >
        <textarea
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          className="border-none w-[90%] md:w-[70%] p-5 text-xl text-white outline-none rounded bg-zinc-700"
          placeholder="Write something"
        ></textarea>
        <button
          type="submit"
          className="bg-[#27E0B3] cursor-pointer active:bg-[#014433] px-5 py-2 md:w-[10%] rounded font-medium"
        >
          {loading ? <Loader /> : "Generate"}
        </button>
      </form>

      {/* Show AI Response */}
      {res && (
        <div className="text-white w-[90%] md:w-[70%] bg-zinc-800 p-5 rounded mb-5 whitespace-pre-line">
          {res}
        </div>
      )}
    </div>
  );
};

export default Hero;
