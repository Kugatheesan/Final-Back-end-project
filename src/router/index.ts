import { Router } from "express";
import userRoute from "./userRouter"
import serviceRouter from "./serviceRouter";
// import bookingRouter from "./bookingRouter";

const router = Router();
 
router.use('/user',userRoute)
router.use('./service',serviceRouter)
// router.use('./booking',bookingRouter)

export default router;