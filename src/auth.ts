import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/google", async (req: Request, res: Response) => {
    const { token } = req.body;

    try {
        const userData = jwt.decode(token);
        console.log("Google User Data:", userData);

        res.json({
            message: "Google Login Successful",
            user: userData,
            token,
        });
    } catch (error) {
        res.status(400).json({ message: "Invalid Google Token" });
    }
});

export default router;
