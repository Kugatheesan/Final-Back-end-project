import { Router } from "express";
import { getAllBookings, createBooking, getBookingById ,editBooking ,deleteBooking} from "../conrollers/bookingController";

const router = Router();

router.post('/book', getAllBookings);
router.get('/booking', createBooking);
router.get('/bookings', getBookingById);
router.put('/editbooking',editBooking);
router.delete('/deletebooking',deleteBooking);



export default router;
