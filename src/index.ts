import  Express  from "express";

import router from "./router/userRouter";


const app=Express()

//middlewara to parse JSON
app.use(Express.json())
app.use('/api',router)



app.listen(3000,()=>{
          console.log("server is running ")              
})