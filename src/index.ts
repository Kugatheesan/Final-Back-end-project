import  Express  from "express";
import express from "express";
import cors from 'cors';
import router from "./router/userRouter";

const app = express();

app.use(cors({
    origin: "*",  // Allow only your frontend
    credentials: true,
  }));

//middlewara to parse JSON
app.use(Express.json())
app.use('/api',router)

// Middleware to parse JSON
app.use(express.json());

// Use the router
app.use('/api', router);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
