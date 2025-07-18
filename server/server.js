import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";



const app = express();

await connectCloudinary();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware({
  // This prevents automatic redirects for API routes
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
}));
// app.use(requireAuth());


app.use("/api/ai", requireAuth(), aiRouter);
app.use("/api/user", requireAuth(), userRouter);


const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    res.send({
        message: "Hello from Genly-Ai",
    });

});


app.listen(PORT, () => console.log("Server has started on port " + PORT));