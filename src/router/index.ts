import { Router } from "express";
import userRoute from "./userRouter"
import serviceRouter from "./serviceRouter";

const router = Router();
 
router.use('/user',userRoute)
router.use('./service',serviceRouter)

export default router;