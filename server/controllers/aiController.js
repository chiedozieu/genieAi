import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message:
          "You have no more free usage, please upgrade your plan to generate more articles",
      });
    }
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length,
    });
    const content = response.choices[0].message.content;
    await sql`INSERT INTO creations(user_id, prompt, content, type)
    VALUES(${userId}, ${prompt}, ${content}, 'article')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.log("Error in generateArticle controller", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Generate Blog Title

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message:
          "You have no more free usage, please upgrade your plan to generate more articles",
      });
    }
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    });
    const content = response.choices[0].message.content;
    await sql`INSERT INTO creations(user_id, prompt, content, type)
    VALUES(${userId}, ${prompt}, ${content}, 'blog-title')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.log("Error in generateBlogTitle controller", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// generate image

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium users",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
      Headers: {'x-api-key': process.env.CLIPDROP_API_KEY,},
      responseType: "arraybuffer",
    })
    const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`
   

    await sql`INSERT INTO creations(user_id, prompt, content, type)
    VALUES(${userId}, ${prompt}, ${content}, 'blog-title')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.log("Error in generateBlogTitle controller", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
