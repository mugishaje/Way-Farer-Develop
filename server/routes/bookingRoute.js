import express from 'express';
import bookingController from '../controllers/bookingController';

const router = express.Router();

router.get('/bookings', bookingController.viewBookings);
router.delete('/bookings/:booking_id', bookingController.deleteBooking);

export default router;