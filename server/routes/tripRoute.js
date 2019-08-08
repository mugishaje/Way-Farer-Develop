import express from 'express';
import tripController from '../controllers/tripController';

const router = express.Router();

router.get('/trips/:trip_id', tripController.getSpecificTrip);
router.get('/trips', tripController.viewTrips);

export default router;