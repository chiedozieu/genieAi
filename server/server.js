import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware, requireAuth } from '@clerk/express'


dotenv.config();



const app = express();
app.use(cors());
app.use(express.json());

app.use(clerkMiddleware())
app.use(requireAuth());

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    res.send({
        message: "Hello from Genly-Ai",
    });

});


app.listen(PORT, () => console.log("Server has started on port " + PORT));