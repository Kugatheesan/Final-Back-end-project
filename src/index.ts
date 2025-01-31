import express from "express";
import cors from 'cors';
import router from "./router/userRouter";

const app = express();

// CORS middleware configuration
const corsOptions = {
  origin: "http://localhost:5173", // Ensure this matches your frontend port
  methods: "GET, POST, PUT, DELETE, PATCH",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies if needed
};

// Apply CORS middleware before routes
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Use the router
app.use('/api', router);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
