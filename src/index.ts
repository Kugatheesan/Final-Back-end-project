import  Express  from "express";
import cors from "cors";
import router from "./router/userRouter";


const app=Express()

app.use(cors({
    origin: "http://localhost:5173",  // Allow only your frontend
    methods: "GET,POST,PUT,DELETE",  // Allowed HTTP methods
    credentials: true, // If using cookies or authentication headers
  }));

//middlewara to parse JSON
app.use(Express.json())
app.use('/api',router)



app.listen(3000,()=>{
          console.log("server is running ")              
})